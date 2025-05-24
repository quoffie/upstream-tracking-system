const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Notification Routes
 * Handles user notifications, preferences, and escalations
 */

// Get all notifications for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    // Build filter conditions
    const where = { userId };
    
    // Filter by unread if requested
    if (unreadOnly === 'true') {
      where.read = false;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get notifications with pagination
    const [notifications, totalCount] = await Promise.all([
      req.prisma.notification.findMany({
        where,
        include: {
          sentBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      req.prisma.notification.count({ where })
    ]);
    
    // Get unread count
    const unreadCount = await req.prisma.notification.count({
      where: {
        userId,
        read: false
      }
    });
    
    res.status(200).json({
      status: 'success',
      data: notifications,
      unreadCount,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch notifications'
    });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    
    // Find notification
    const notification = await req.prisma.notification.findUnique({
      where: { id }
    });
    
    if (!notification) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found'
      });
    }
    
    // Verify notification belongs to user
    if (notification.userId !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this notification'
      });
    }
    
    // Update notification
    const updatedNotification = await req.prisma.notification.update({
      where: { id },
      data: { read: true, readAt: new Date() }
    });
    
    res.status(200).json({
      status: 'success',
      data: updatedNotification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to mark notification as read'
    });
  }
});

// Mark all notifications as read
router.patch('/mark-all-read', authenticate, async (req, res) => {
  try {
    const { userId } = req.user;
    
    // Update all unread notifications for user
    const { count } = await req.prisma.notification.updateMany({
      where: {
        userId,
        read: false
      },
      data: {
        read: true,
        readAt: new Date()
      }
    });
    
    res.status(200).json({
      status: 'success',
      message: `Marked ${count} notifications as read`,
      count
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to mark all notifications as read'
    });
  }
});

// Update notification preferences
router.patch('/preferences', authenticate, async (req, res) => {
  try {
    const { userId } = req.user;
    const { emailEnabled, smsEnabled, inAppEnabled } = req.body;
    
    // Update user preferences
    const updatedUser = await req.prisma.user.update({
      where: { id: userId },
      data: {
        notificationPreferences: {
          upsert: {
            create: {
              emailEnabled,
              smsEnabled,
              inAppEnabled
            },
            update: {
              emailEnabled,
              smsEnabled,
              inAppEnabled
            }
          }
        }
      },
      include: {
        notificationPreferences: true
      }
    });
    
    res.status(200).json({
      status: 'success',
      data: updatedUser.notificationPreferences
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update notification preferences'
    });
  }
});

// Get notification preferences
router.get('/preferences', authenticate, async (req, res) => {
  try {
    const { userId } = req.user;
    
    // Get user preferences
    const user = await req.prisma.user.findUnique({
      where: { id: userId },
      include: {
        notificationPreferences: true
      }
    });
    
    // If no preferences exist yet, return defaults
    const preferences = user.notificationPreferences || {
      emailEnabled: true,
      smsEnabled: true,
      inAppEnabled: true
    };
    
    res.status(200).json({
      status: 'success',
      data: preferences
    });
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch notification preferences'
    });
  }
});

// Check for unacknowledged alerts and escalate if needed
router.post('/check-escalations', authenticate, async (req, res) => {
  try {
    const { escalationThresholdHours = 24 } = req.body;
    const now = new Date();
    const escalationThreshold = new Date(now.getTime() - (escalationThresholdHours * 60 * 60 * 1000));
    
    // Find unread important notifications older than threshold
    const unacknowledgedAlerts = await req.prisma.notification.findMany({
      where: {
        read: false,
        createdAt: {
          lt: escalationThreshold
        },
        // Only escalate important notifications
        OR: [
          { title: { contains: 'Required' } },
          { title: { contains: 'Alert' } },
          { title: { contains: 'Warning' } },
          { title: { contains: 'Expiration' } },
          { title: { contains: 'Review' } }
        ]
      },
      include: {
        user: true
      }
    });
    
    // Group alerts by role for escalation
    const alertsByRole = {};
    for (const alert of unacknowledgedAlerts) {
      const role = alert.user.role;
      if (!alertsByRole[role]) {
        alertsByRole[role] = [];
      }
      alertsByRole[role].push(alert);
    }
    
    // Escalate to supervisors/admins
    const escalationResults = [];
    for (const [role, alerts] of Object.entries(alertsByRole)) {
      // Find supervisors/admins to escalate to
      const supervisors = await req.prisma.user.findMany({
        where: {
          role: 'ADMIN'
        }
      });
      
      if (supervisors.length > 0) {
        for (const supervisor of supervisors) {
          // Send escalation notification
          const notification = await notificationService.sendMultiChannelNotification(req.prisma, {
            userId: supervisor.id,
            sentById: req.user.userId,
            title: `Escalation: Unacknowledged ${role} Alerts`,
            message: `${alerts.length} important alerts for ${role} users have not been acknowledged for over ${escalationThresholdHours} hours.`,
            email: supervisor.email,
            channels: ['IN_APP', 'EMAIL']
          });
          
          escalationResults.push({
            role,
            alertCount: alerts.length,
            escalatedTo: supervisor.id,
            notificationSent: notification
          });
        }
      }
    }
    
    res.status(200).json({
      status: 'success',
      message: `Checked ${unacknowledgedAlerts.length} unacknowledged alerts and escalated where needed`,
      data: escalationResults
    });
  } catch (error) {
    console.error('Error checking notification escalations:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to check notification escalations'
    });
  }
});

module.exports = router;