const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const bcrypt = require('bcryptjs');
const notificationService = require('../services/notification.service');

/**
 * User Management Routes
 * Handles user CRUD operations, role management, and user administration
 */

// Get all users (Admin only)
router.get('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, company, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        role ? { role } : {},
        company ? { companyId: company } : {},
        search ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    };

    const [users, total] = await Promise.all([
      req.prisma.user.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          company: {
            select: {
              id: true,
              name: true,
              registrationNumber: true
            }
          }
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
          company: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.user.count({ where })
    ]);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    // Users can only view their own profile unless they're admin
    if (role !== 'ADMIN' && userId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await req.prisma.user.findUnique({
      where: { id },
      include: {
        company: true,
        personnel: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        profilePicture: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        company: true,
        personnel: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user (Admin only)
router.post('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, companyId, phone } = req.body;

    // Check if user already exists
    const existingUser = await req.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await req.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone,
        companyId: companyId || null
      },
      include: {
        company: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
        company: true
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'CREATE_USER',
        entityType: 'USER',
        entityId: user.id,
        newValues: { email: user.email, role: user.role },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Send welcome notification to new user
    await notificationService.sendMultiChannelNotification(req.prisma, {
      userId: user.id,
      sentById: req.user.userId,
      title: 'Account Created',
      message: `Your PC-OTS account has been created by an administrator. Welcome to the system!`,
      email: user.email,
      emailSubject: 'PC-OTS Account Created',
      emailBody: `Your account has been created with the following details:\n\nEmail: ${user.email}\nRole: ${user.role}\n\nPlease contact your administrator for your temporary password.`,
      channels: ['IN_APP', 'EMAIL']
    });

    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;
    const { firstName, lastName, phone, profilePicture, isActive, role: newRole } = req.body;

    // Users can only update their own profile unless they're admin
    if (role !== 'ADMIN' && userId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Only admins can change role and active status
    const updateData = {
      firstName,
      lastName,
      phone,
      profilePicture
    };

    if (role === 'ADMIN') {
      if (isActive !== undefined) updateData.isActive = isActive;
      if (newRole) updateData.role = newRole;
    }

    // Get old values for audit log
    const oldUser = await req.prisma.user.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true
      }
    });

    if (!oldUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await req.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        company: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        profilePicture: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        company: true
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'UPDATE_USER',
        entityType: 'USER',
        entityId: id,
        oldValues: oldUser,
        newValues: updateData,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Send notification if account status changed
    if (role === 'ADMIN' && oldUser.isActive !== updateData.isActive) {
      await notificationService.sendMultiChannelNotification(req.prisma, {
        userId: id,
        sentById: req.user.userId,
        title: 'Account Status Changed',
        message: `Your account has been ${updateData.isActive ? 'activated' : 'deactivated'} by an administrator.`,
        email: updatedUser.email,
        emailSubject: 'PC-OTS Account Status Changed',
        channels: ['IN_APP', 'EMAIL']
      });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await req.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await req.prisma.user.count({
        where: { role: 'ADMIN', isActive: true }
      });
      
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last active admin user' });
      }
    }

    // Soft delete by deactivating instead of hard delete to maintain data integrity
    await req.prisma.user.update({
      where: { id },
      data: { isActive: false }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'DELETE_USER',
        entityType: 'USER',
        entityId: id,
        oldValues: user,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user statistics (Admin only)
router.get('/stats/overview', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const [totalUsers, activeUsers, usersByRole, recentUsers] = await Promise.all([
      req.prisma.user.count(),
      req.prisma.user.count({ where: { isActive: true } }),
      req.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      }),
      req.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true
        }
      })
    ]);

    const roleStats = usersByRole.reduce((acc, item) => {
      acc[item.role] = item._count.role;
      return acc;
    }, {});

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      roleStats,
      recentUsers
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk user operations (Admin only)
router.post('/bulk-action', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { action, userIds } = req.body;

    if (!action || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    let result;
    switch (action) {
      case 'activate':
        result = await req.prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { isActive: true }
        });
        break;
      case 'deactivate':
        result = await req.prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: { isActive: false }
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    // Log the bulk action
    await req.prisma.auditLog.create({
      data: {
        action: `BULK_${action.toUpperCase()}_USERS`,
        entityType: 'USER',
        entityId: 'BULK',
        newValues: { userIds, action },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({
      message: `Bulk ${action} completed successfully`,
      affectedCount: result.count
    });
  } catch (error) {
    console.error('Bulk user action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;