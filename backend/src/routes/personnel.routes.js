const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Personnel Management Routes
 * Handles personnel registration, work permits, and expatriate management
 */

// Get all personnel
router.get('/', authenticate, async (req, res) => {
  try {
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, company, nationality, isExpatriate, search } = req.query;
    const skip = (page - 1) * limit;

    let where = {};

    // Company users can only see their own personnel
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER'].includes(role)) {
      where.companyId = companyId;
    } else if (company) {
      where.companyId = company;
    }

    // Add filters
    if (nationality) where.nationality = nationality;
    if (isExpatriate !== undefined) where.isExpatriate = isExpatriate === 'true';
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [personnel, total] = await Promise.all([
      req.prisma.personnel.findMany({
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
          },
          permits: {
            select: {
              id: true,
              permitNumber: true,
              permitType: true,
              status: true,
              expiryDate: true
            }
          },
          _count: {
            select: {
              documents: true,
              permits: true
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
    console.error('Get personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get personnel by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;

    const personnel = await req.prisma.personnel.findUnique({
      where: { id },
      include: {
        company: true,
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
            lastLogin: true
          }
        },
        permits: {
          include: {
            company: {
              select: {
                name: true
              }
            },
            _count: {
              select: {
                documents: true,
                payments: true
              }
            }
          }
        },
        documents: {
          select: {
            id: true,
            fileName: true,
            documentType: true,
            uploadDate: true,
            expiryDate: true
          }
        }
      }
    });

    if (!personnel) {
      return res.status(404).json({ error: 'Personnel not found' });
    }

    // Company users can only view their own personnel unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER'].includes(role) && 
        personnel.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ personnel });
  } catch (error) {
    console.error('Get personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new personnel
router.post('/', authenticate, async (req, res) => {
  try {
    const { role, companyId } = req.user;
    const {
      firstName,
      lastName,
      email,
      phone,
      nationality,
      position,
      isExpatriate,
      passportNumber,
      workPermitNumber,
      workPermitExpiry,
      medicalCertExpiry,
      bosietCertExpiry,
      companyId: targetCompanyId
    } = req.body;

    // Determine which company to assign personnel to
    let assignedCompanyId = companyId;
    if (['ADMIN', 'INSPECTOR'].includes(role) && targetCompanyId) {
      assignedCompanyId = targetCompanyId;
    }

    // Check if personnel already exists
    const existingPersonnel = await req.prisma.personnel.findUnique({
      where: { email }
    });

    if (existingPersonnel) {
      return res.status(400).json({ error: 'Personnel already exists with this email' });
    }

    // Create personnel
    const personnel = await req.prisma.personnel.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        nationality,
        position,
        isExpatriate: isExpatriate || false,
        passportNumber,
        workPermitNumber,
        workPermitExpiry: workPermitExpiry ? new Date(workPermitExpiry) : null,
        medicalCertExpiry: medicalCertExpiry ? new Date(medicalCertExpiry) : null,
        bosietCertExpiry: bosietCertExpiry ? new Date(bosietCertExpiry) : null,
        companyId: assignedCompanyId
      },
      include: {
        company: {
          select: {
            name: true
          }
        }
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'CREATE_PERSONNEL',
        entityType: 'PERSONNEL',
        entityId: personnel.id,
        newValues: { 
          name: `${personnel.firstName} ${personnel.lastName}`,
          email: personnel.email,
          position: personnel.position,
          isExpatriate: personnel.isExpatriate
        },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Send notification to immigration officers if expatriate
    if (personnel.isExpatriate) {
      const immigrationOfficers = await req.prisma.user.findMany({
        where: { role: 'IMMIGRATION_OFFICER', isActive: true }
      });

      for (const officer of immigrationOfficers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: officer.id,
          sentById: req.user.userId,
          title: 'New Expatriate Personnel Registered',
          message: `New expatriate personnel ${personnel.firstName} ${personnel.lastName} has been registered by ${personnel.company.name}.`,
          email: officer.email,
          emailSubject: 'PC-OTS - New Expatriate Personnel Registration',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.status(201).json({
      message: 'Personnel created successfully',
      personnel
    });
  } catch (error) {
    console.error('Create personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update personnel
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const {
      firstName,
      lastName,
      phone,
      nationality,
      position,
      isExpatriate,
      passportNumber,
      workPermitNumber,
      workPermitExpiry,
      medicalCertExpiry,
      bosietCertExpiry
    } = req.body;

    // Get existing personnel
    const existingPersonnel = await req.prisma.personnel.findUnique({
      where: { id },
      include: {
        company: true
      }
    });

    if (!existingPersonnel) {
      return res.status(404).json({ error: 'Personnel not found' });
    }

    // Company users can only update their own personnel unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER'].includes(role) && 
        existingPersonnel.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {
      firstName,
      lastName,
      phone,
      nationality,
      position,
      isExpatriate: isExpatriate || false,
      passportNumber,
      workPermitNumber,
      workPermitExpiry: workPermitExpiry ? new Date(workPermitExpiry) : null,
      medicalCertExpiry: medicalCertExpiry ? new Date(medicalCertExpiry) : null,
      bosietCertExpiry: bosietCertExpiry ? new Date(bosietCertExpiry) : null
    };

    const updatedPersonnel = await req.prisma.personnel.update({
      where: { id },
      data: updateData,
      include: {
        company: {
          select: {
            name: true
          }
        }
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'UPDATE_PERSONNEL',
        entityType: 'PERSONNEL',
        entityId: id,
        oldValues: existingPersonnel,
        newValues: updateData,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Notify if expatriate status changed
    if (existingPersonnel.isExpatriate !== updateData.isExpatriate) {
      const immigrationOfficers = await req.prisma.user.findMany({
        where: { role: 'IMMIGRATION_OFFICER', isActive: true }
      });

      for (const officer of immigrationOfficers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: officer.id,
          sentById: req.user.userId,
          title: 'Personnel Expatriate Status Changed',
          message: `Personnel ${updatedPersonnel.firstName} ${updatedPersonnel.lastName} expatriate status has been changed to ${updateData.isExpatriate ? 'Expatriate' : 'Local'}.`,
          email: officer.email,
          emailSubject: 'PC-OTS - Personnel Status Change',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.json({
      message: 'Personnel updated successfully',
      personnel: updatedPersonnel
    });
  } catch (error) {
    console.error('Update personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete personnel
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;

    // Get existing personnel
    const personnel = await req.prisma.personnel.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            permits: true
          }
        }
      }
    });

    if (!personnel) {
      return res.status(404).json({ error: 'Personnel not found' });
    }

    // Company users can only delete their own personnel unless they're admin
    if (!['ADMIN', 'INSPECTOR'].includes(role) && personnel.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if personnel has active permits
    if (personnel._count.permits > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete personnel with active permits. Please remove permits first.' 
      });
    }

    await req.prisma.personnel.delete({
      where: { id }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'DELETE_PERSONNEL',
        entityType: 'PERSONNEL',
        entityId: id,
        oldValues: personnel,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'Personnel deleted successfully' });
  } catch (error) {
    console.error('Delete personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get personnel statistics
router.get('/stats/overview', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER']), async (req, res) => {
  try {
    const [totalPersonnel, expatriatePersonnel, personnelByNationality, expiringPermits, recentPersonnel] = await Promise.all([
      req.prisma.personnel.count(),
      req.prisma.personnel.count({ where: { isExpatriate: true } }),
      req.prisma.personnel.groupBy({
        by: ['nationality'],
        _count: { nationality: true },
        orderBy: { _count: { nationality: 'desc' } },
        take: 10
      }),
      req.prisma.personnel.findMany({
        where: {
          workPermitExpiry: {
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          }
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          workPermitExpiry: true,
          company: {
            select: {
              name: true
            }
          }
        },
        orderBy: { workPermitExpiry: 'asc' }
      }),
      req.prisma.personnel.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          position: true,
          nationality: true,
          isExpatriate: true,
          createdAt: true,
          company: {
            select: {
              name: true
            }
          }
        }
      })
    ]);

    const nationalityStats = personnelByNationality.reduce((acc, item) => {
      acc[item.nationality] = item._count.nationality;
      return acc;
    }, {});

    res.json({
      totalPersonnel,
      expatriatePersonnel,
      localPersonnel: totalPersonnel - expatriatePersonnel,
      nationalityStats,
      expiringPermits,
      recentPersonnel
    });
  } catch (error) {
    console.error('Get personnel stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get expiring documents/permits
router.get('/expiring/documents', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER']), async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const expiryDate = new Date(Date.now() + parseInt(days) * 24 * 60 * 60 * 1000);

    const expiringItems = await req.prisma.personnel.findMany({
      where: {
        OR: [
          { workPermitExpiry: { lte: expiryDate, gte: new Date() } },
          { medicalCertExpiry: { lte: expiryDate, gte: new Date() } },
          { bosietCertExpiry: { lte: expiryDate, gte: new Date() } }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        workPermitExpiry: true,
        medicalCertExpiry: true,
        bosietCertExpiry: true,
        company: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { workPermitExpiry: 'asc' }
    });

    res.json({ expiringItems });
  } catch (error) {
    console.error('Get expiring documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk personnel operations
router.post('/bulk-action', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER']), async (req, res) => {
  try {
    const { action, personnelIds, data } = req.body;

    if (!action || !personnelIds || !Array.isArray(personnelIds)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    let result;
    switch (action) {
      case 'update_nationality':
        if (!data.nationality) {
          return res.status(400).json({ error: 'Nationality is required' });
        }
        result = await req.prisma.personnel.updateMany({
          where: { id: { in: personnelIds } },
          data: { nationality: data.nationality }
        });
        break;
      case 'mark_expatriate':
        result = await req.prisma.personnel.updateMany({
          where: { id: { in: personnelIds } },
          data: { isExpatriate: true }
        });
        break;
      case 'mark_local':
        result = await req.prisma.personnel.updateMany({
          where: { id: { in: personnelIds } },
          data: { isExpatriate: false }
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    // Log the bulk action
    await req.prisma.auditLog.create({
      data: {
        action: `BULK_${action.toUpperCase()}_PERSONNEL`,
        entityType: 'PERSONNEL',
        entityId: 'BULK',
        newValues: { personnelIds, action, data },
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
    console.error('Bulk personnel action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;