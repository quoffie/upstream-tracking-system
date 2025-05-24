const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Permit Routes
 * Handles all permit-related operations including application, review, approval, and notifications
 */

// Create a new permit application
router.post('/', authenticate, authorize(['COMPANY']), async (req, res) => {
  try {
    const { userId } = req.user;
    const permitData = req.body;

    // Create permit in database
    const permit = await req.prisma.permit.create({
      data: {
        ...permitData,
        status: 'PENDING',
        submittedBy: { connect: { id: userId } },
        company: { connect: { id: permitData.companyId } }
      },
      include: {
        company: true,
        submittedBy: true
      }
    });

    // Find responsible officers for notification
    const reviewers = await req.prisma.user.findMany({
      where: {
        role: 'REVIEWER'
      }
    });

    // Notify reviewers about new permit application
    if (reviewers.length > 0) {
      for (const reviewer of reviewers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: reviewer.id,
          sentById: userId,
          title: 'New Permit Application',
          message: `A new ${permit.type} permit application has been submitted by ${permit.company.name} and requires your review.`,
          email: reviewer.email,
          emailSubject: 'New Permit Application Requires Review',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.status(201).json({
      status: 'success',
      data: permit
    });
  } catch (error) {
    console.error('Error creating permit:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create permit application'
    });
  }
});

// Update permit status
router.patch('/:id/status', authenticate, authorize(['ADMIN', 'REVIEWER', 'COMPLIANCE', 'LOCAL_CONTENT']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    const { userId, role } = req.user;

    // Check if permit exists
    const existingPermit = await req.prisma.permit.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            users: true
          }
        },
        submittedBy: true
      }
    });

    if (!existingPermit) {
      return res.status(404).json({
        status: 'error',
        message: 'Permit not found'
      });
    }

    // Update permit status
    const updatedPermit = await req.prisma.permit.update({
      where: { id },
      data: {
        status,
        lastUpdatedBy: { connect: { id: userId } },
        statusHistory: {
          create: {
            status,
            comments,
            updatedBy: { connect: { id: userId } }
          }
        }
      },
      include: {
        company: true,
        submittedBy: true,
        lastUpdatedBy: true
      }
    });

    // Create audit log
    await req.prisma.auditLog.create({
      data: {
        action: 'UPDATE_PERMIT_STATUS',
        description: `Permit status updated to ${status}`,
        user: { connect: { id: userId } },
        metadata: {
          permitId: id,
          oldStatus: existingPermit.status,
          newStatus: status,
          comments
        }
      }
    });

    // Notify company users about status change
    const companyUsers = existingPermit.company.users;
    if (companyUsers.length > 0) {
      for (const user of companyUsers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: user.id,
          sentById: userId,
          title: 'Permit Status Update',
          message: `Your ${existingPermit.type} permit application (${existingPermit.permitNumber}) status has been updated to ${status}.`,
          email: user.email,
          emailSubject: 'Permit Application Status Update',
          emailHtml: notificationService.createPermitStatusEmailTemplate(existingPermit, status),
          phone: user.phone,
          smsMessage: `PC-OTS: Your permit ${existingPermit.permitNumber} status is now ${status}. Log in to view details.`,
          channels: ['IN_APP', 'EMAIL', 'SMS']
        });
      }
    }

    // If status requires specific officer attention, notify them
    if (status === 'COMPLIANCE_REVIEW') {
      // Find compliance officers
      const complianceOfficers = await req.prisma.user.findMany({
        where: { role: 'COMPLIANCE' }
      });

      // Notify compliance officers
      for (const officer of complianceOfficers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: officer.id,
          sentById: userId,
          title: 'Compliance Review Required',
          message: `A ${existingPermit.type} permit (${existingPermit.permitNumber}) from ${existingPermit.company.name} requires compliance review.`,
          email: officer.email,
          channels: ['IN_APP', 'EMAIL']
        });
      }
    } else if (status === 'LOCAL_CONTENT_REVIEW') {
      // Find local content officers
      const lcOfficers = await req.prisma.user.findMany({
        where: { role: 'LOCAL_CONTENT' }
      });

      // Notify local content officers
      for (const officer of lcOfficers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: officer.id,
          sentById: userId,
          title: 'Local Content Review Required',
          message: `A ${existingPermit.type} permit (${existingPermit.permitNumber}) from ${existingPermit.company.name} requires local content review.`,
          email: officer.email,
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.status(200).json({
      status: 'success',
      data: updatedPermit
    });
  } catch (error) {
    console.error('Error updating permit status:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update permit status'
    });
  }
});

// Get all permits with filtering options
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, type, companyId, page = 1, limit = 10 } = req.query;
    const { role, userId } = req.user;
    
    // Build filter conditions
    const where = {};
    
    // Apply status filter if provided
    if (status) {
      where.status = status;
    }
    
    // Apply type filter if provided
    if (type) {
      where.type = type;
    }
    
    // For company users, only show their company's permits
    if (role === 'COMPANY') {
      const userCompany = await req.prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true }
      });
      
      where.companyId = userCompany.companyId;
    } 
    // For admin users, filter by company if requested
    else if (companyId && ['ADMIN', 'REVIEWER', 'COMPLIANCE', 'LOCAL_CONTENT'].includes(role)) {
      where.companyId = companyId;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get permits with pagination
    const [permits, totalCount] = await Promise.all([
      req.prisma.permit.findMany({
        where,
        include: {
          company: true,
          submittedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          lastUpdatedBy: {
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
      req.prisma.permit.count({ where })
    ]);
    
    res.status(200).json({
      status: 'success',
      data: permits,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching permits:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch permits'
    });
  }
});

// Get permit by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user;
    
    // Find permit with related data
    const permit = await req.prisma.permit.findUnique({
      where: { id },
      include: {
        company: true,
        submittedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        lastUpdatedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true
          }
        },
        statusHistory: {
          include: {
            updatedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        documents: true,
        lcPlan: true,
        personnel: true,
        payments: true,
        inspections: true
      }
    });
    
    if (!permit) {
      return res.status(404).json({
        status: 'error',
        message: 'Permit not found'
      });
    }
    
    // For company users, verify they belong to the permit's company
    if (role === 'COMPANY') {
      const userCompany = await req.prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true }
      });
      
      if (permit.companyId !== userCompany.companyId) {
        return res.status(403).json({
          status: 'error',
          message: 'You do not have permission to view this permit'
        });
      }
    }
    
    res.status(200).json({
      status: 'success',
      data: permit
    });
  } catch (error) {
    console.error('Error fetching permit:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch permit'
    });
  }
});

// Check for permits approaching expiration and notify
router.post('/check-expirations', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    // Find permits expiring in the next 30 days
    const expiringPermits = await req.prisma.permit.findMany({
      where: {
        status: 'APPROVED',
        expiryDate: {
          gte: today,
          lte: thirtyDaysFromNow
        },
        // Exclude permits that already have renewal notifications
        NOT: {
          notifications: {
            some: {
              title: 'Permit Expiration Warning'
            }
          }
        }
      },
      include: {
        company: {
          include: {
            users: true
          }
        }
      }
    });
    
    // Send notifications for each expiring permit
    const notificationResults = [];
    for (const permit of expiringPermits) {
      // Calculate days until expiration
      const daysUntilExpiry = Math.ceil((permit.expiryDate - today) / (1000 * 60 * 60 * 24));
      
      // Notify company users
      for (const user of permit.company.users) {
        const notification = await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: user.id,
          sentById: req.user.userId,
          title: 'Permit Expiration Warning',
          message: `Your ${permit.type} permit (${permit.permitNumber}) will expire in ${daysUntilExpiry} days. Please submit a renewal application.`,
          email: user.email,
          emailSubject: 'Important: Permit Expiration Notice',
          phone: user.phone,
          smsMessage: `PC-OTS: Your permit ${permit.permitNumber} expires in ${daysUntilExpiry} days. Please renew soon.`,
          channels: ['IN_APP', 'EMAIL', 'SMS']
        });
        
        notificationResults.push({
          permitId: permit.id,
          permitNumber: permit.permitNumber,
          expiryDate: permit.expiryDate,
          daysUntilExpiry,
          notificationSent: notification
        });
      }
      
      // Also notify compliance officers about expiring permits
      const complianceOfficers = await req.prisma.user.findMany({
        where: { role: 'COMPLIANCE' }
      });
      
      for (const officer of complianceOfficers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: officer.id,
          sentById: req.user.userId,
          title: 'Permit Expiration Alert',
          message: `${permit.company.name}'s ${permit.type} permit (${permit.permitNumber}) will expire in ${daysUntilExpiry} days.`,
          email: officer.email,
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }
    
    res.status(200).json({
      status: 'success',
      message: `Checked ${expiringPermits.length} expiring permits and sent notifications`,
      data: notificationResults
    });
  } catch (error) {
    console.error('Error checking permit expirations:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to check permit expirations'
    });
  }
});

module.exports = router;