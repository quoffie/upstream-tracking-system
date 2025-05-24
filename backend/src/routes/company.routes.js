const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Company Management Routes
 * Handles company registration, profile management, and company-related operations
 */

// Get all companies
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, isIndigenous } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        category ? { category } : {},
        isIndigenous !== undefined ? { isIndigenous: isIndigenous === 'true' } : {},
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { registrationNumber: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    };

    const [companies, total] = await Promise.all([
      req.prisma.company.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          _count: {
            select: {
              users: true,
              permits: true,
              personnel: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.company.count({ where })
    ]);

    res.json({
      companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;

    // Company users can only view their own company unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const company = await req.prisma.company.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true
          }
        },
        permits: {
          select: {
            id: true,
            permitNumber: true,
            permitType: true,
            status: true,
            applicationDate: true,
            expiryDate: true
          },
          orderBy: { createdAt: 'desc' }
        },
        personnel: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            position: true,
            nationality: true,
            isExpatriate: true
          }
        },
        jvCompanies: true,
        localContentPlans: {
          orderBy: { year: 'desc' }
        },
        performanceReports: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            users: true,
            permits: true,
            personnel: true,
            documents: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ company });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new company
router.post('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const {
      name,
      registrationNumber,
      incorporationDate,
      address,
      email,
      phone,
      website,
      category,
      specialization,
      isIndigenous,
      indigenousOwnershipPct
    } = req.body;

    // Check if company already exists
    const existingCompany = await req.prisma.company.findUnique({
      where: { registrationNumber }
    });

    if (existingCompany) {
      return res.status(400).json({ error: 'Company already exists with this registration number' });
    }

    // Create company
    const company = await req.prisma.company.create({
      data: {
        name,
        registrationNumber,
        incorporationDate: new Date(incorporationDate),
        address,
        email,
        phone,
        website,
        category,
        specialization: specialization || [],
        isIndigenous: isIndigenous || false,
        indigenousOwnershipPct: indigenousOwnershipPct || null
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'CREATE_COMPANY',
        entityType: 'COMPANY',
        entityId: company.id,
        newValues: { name: company.name, registrationNumber: company.registrationNumber },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.status(201).json({
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update company
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const {
      name,
      address,
      email,
      phone,
      website,
      category,
      specialization,
      isIndigenous,
      indigenousOwnershipPct,
      isActive
    } = req.body;

    // Company users can only update their own company unless they're admin
    if (role !== 'ADMIN' && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get old values for audit log
    const oldCompany = await req.prisma.company.findUnique({
      where: { id }
    });

    if (!oldCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const updateData = {
      name,
      address,
      email,
      phone,
      website,
      category,
      specialization: specialization || [],
      isIndigenous: isIndigenous || false,
      indigenousOwnershipPct: indigenousOwnershipPct || null
    };

    // Only admins can change active status
    if (role === 'ADMIN' && isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const updatedCompany = await req.prisma.company.update({
      where: { id },
      data: updateData
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'UPDATE_COMPANY',
        entityType: 'COMPANY',
        entityId: id,
        oldValues: oldCompany,
        newValues: updateData,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Notify company users if status changed
    if (role === 'ADMIN' && oldCompany.isActive !== updateData.isActive) {
      const companyUsers = await req.prisma.user.findMany({
        where: { companyId: id },
        select: { id: true, email: true }
      });

      for (const user of companyUsers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: user.id,
          sentById: req.user.userId,
          title: 'Company Status Changed',
          message: `Your company ${updatedCompany.name} has been ${updateData.isActive ? 'activated' : 'deactivated'} by an administrator.`,
          email: user.email,
          emailSubject: 'PC-OTS Company Status Changed',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.json({
      message: 'Company updated successfully',
      company: updatedCompany
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete company (Admin only)
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if company exists
    const company = await req.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            permits: true,
            personnel: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if company has active permits or users
    if (company._count.users > 0 || company._count.permits > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete company with active users or permits. Please deactivate instead.' 
      });
    }

    // Soft delete by deactivating
    await req.prisma.company.update({
      where: { id },
      data: { isActive: false }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'DELETE_COMPANY',
        entityType: 'COMPANY',
        entityId: id,
        oldValues: company,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'Company deactivated successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company statistics
router.get('/stats/overview', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER']), async (req, res) => {
  try {
    const [totalCompanies, activeCompanies, companiesByCategory, indigenousCompanies, recentCompanies] = await Promise.all([
      req.prisma.company.count(),
      req.prisma.company.count({ where: { isActive: true } }),
      req.prisma.company.groupBy({
        by: ['category'],
        _count: { category: true }
      }),
      req.prisma.company.count({ where: { isIndigenous: true } }),
      req.prisma.company.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          registrationNumber: true,
          category: true,
          isIndigenous: true,
          createdAt: true
        }
      })
    ]);

    const categoryStats = companiesByCategory.reduce((acc, item) => {
      acc[item.category] = item._count.category;
      return acc;
    }, {});

    res.json({
      totalCompanies,
      activeCompanies,
      inactiveCompanies: totalCompanies - activeCompanies,
      indigenousCompanies,
      foreignCompanies: totalCompanies - indigenousCompanies,
      categoryStats,
      recentCompanies
    });
  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company permits
router.get('/:id/permits', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, status, type } = req.query;
    const skip = (page - 1) * limit;

    // Company users can only view their own company permits unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const where = {
      companyId: id,
      ...(status && { status }),
      ...(type && { permitType: type })
    };

    const [permits, total] = await Promise.all([
      req.prisma.permit.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              position: true
            }
          },
          _count: {
            select: {
              documents: true,
              payments: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.permit.count({ where })
    ]);

    res.json({
      permits,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get company permits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company personnel
router.get('/:id/personnel', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, nationality, isExpatriate } = req.query;
    const skip = (page - 1) * limit;

    // Company users can only view their own company personnel unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const where = {
      companyId: id,
      ...(nationality && { nationality }),
      ...(isExpatriate !== undefined && { isExpatriate: isExpatriate === 'true' })
    };

    const [personnel, total] = await Promise.all([
      req.prisma.personnel.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          permits: {
            select: {
              id: true,
              permitNumber: true,
              permitType: true,
              status: true,
              expiryDate: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.personnel.count({ where })
    ]);

    res.json({
      personnel,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get company personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;