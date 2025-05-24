const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Joint Venture Management Routes
 * Handles JV company registration, equity management, and partnership tracking
 */

// Get all JV companies
router.get('/', authenticate, async (req, res) => {
  try {
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, company, search } = req.query;
    const skip = (page - 1) * limit;

    let where = {};

    // Company users can only see their own JV companies
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'JV_COORDINATOR'].includes(role)) {
      where.companyId = companyId;
    } else if (company) {
      where.companyId = company;
    }

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { registrationNumber: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [jvCompanies, total] = await Promise.all([
      req.prisma.jVCompany.findMany({
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
          _count: {
            select: {
              documents: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.jVCompany.count({ where })
    ]);

    res.json({
      jvCompanies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get JV companies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get JV company by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;

    const jvCompany = await req.prisma.jVCompany.findUnique({
      where: { id },
      include: {
        company: true,
        documents: {
          select: {
            id: true,
            fileName: true,
            documentType: true,
            uploadDate: true,
            expiryDate: true
          },
          orderBy: { uploadDate: 'desc' }
        }
      }
    });

    if (!jvCompany) {
      return res.status(404).json({ error: 'JV company not found' });
    }

    // Company users can only view their own JV companies unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'JV_COORDINATOR'].includes(role) && 
        jvCompany.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ jvCompany });
  } catch (error) {
    console.error('Get JV company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new JV company
router.post('/', authenticate, async (req, res) => {
  try {
    const { role, companyId } = req.user;
    const {
      name,
      registrationNumber,
      indigenousEquity,
      foreignEquity,
      boardResolutionDoc,
      equityAgreementDoc,
      companyId: targetCompanyId
    } = req.body;

    // Validate equity percentages
    if (indigenousEquity + foreignEquity !== 100) {
      return res.status(400).json({ error: 'Indigenous and foreign equity must total 100%' });
    }

    // Determine which company to assign JV to
    let assignedCompanyId = companyId;
    if (['ADMIN', 'INSPECTOR', 'JV_COORDINATOR'].includes(role) && targetCompanyId) {
      assignedCompanyId = targetCompanyId;
    }

    // Check if JV company already exists
    const existingJV = await req.prisma.jVCompany.findUnique({
      where: { registrationNumber }
    });

    if (existingJV) {
      return res.status(400).json({ error: 'JV company already exists with this registration number' });
    }

    // Create JV company
    const jvCompany = await req.prisma.jVCompany.create({
      data: {
        name,
        registrationNumber,
        indigenousEquity,
        foreignEquity,
        boardResolutionDoc,
        equityAgreementDoc,
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
        action: 'CREATE_JV_COMPANY',
        entityType: 'JV_COMPANY',
        entityId: jvCompany.id,
        newValues: { 
          name: jvCompany.name,
          registrationNumber: jvCompany.registrationNumber,
          indigenousEquity: jvCompany.indigenousEquity,
          foreignEquity: jvCompany.foreignEquity
        },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Send notification to JV coordinators
    const jvCoordinators = await req.prisma.user.findMany({
      where: { role: 'JV_COORDINATOR', isActive: true }
    });

    for (const coordinator of jvCoordinators) {
      await notificationService.sendMultiChannelNotification(req.prisma, {
        userId: coordinator.id,
        sentById: req.user.userId,
        title: 'New JV Company Registered',
        message: `New joint venture company ${jvCompany.name} has been registered by ${jvCompany.company.name} with ${jvCompany.indigenousEquity}% indigenous equity.`,
        email: coordinator.email,
        emailSubject: 'PC-OTS - New JV Company Registration',
        channels: ['IN_APP', 'EMAIL']
      });
    }

    res.status(201).json({
      message: 'JV company created successfully',
      jvCompany
    });
  } catch (error) {
    console.error('Create JV company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update JV company
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const {
      name,
      indigenousEquity,
      foreignEquity,
      boardResolutionDoc,
      equityAgreementDoc
    } = req.body;

    // Get existing JV company
    const existingJV = await req.prisma.jVCompany.findUnique({
      where: { id },
      include: {
        company: true
      }
    });

    if (!existingJV) {
      return res.status(404).json({ error: 'JV company not found' });
    }

    // Company users can only update their own JV companies unless they're admin/coordinator
    if (!['ADMIN', 'INSPECTOR', 'JV_COORDINATOR'].includes(role) && 
        existingJV.companyId !== companyId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Validate equity percentages if provided
    if (indigenousEquity !== undefined && foreignEquity !== undefined) {
      if (indigenousEquity + foreignEquity !== 100) {
        return res.status(400).json({ error: 'Indigenous and foreign equity must total 100%' });
      }
    }

    const updateData = {
      name,
      indigenousEquity,
      foreignEquity,
      boardResolutionDoc,
      equityAgreementDoc
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedJV = await req.prisma.jVCompany.update({
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
        action: 'UPDATE_JV_COMPANY',
        entityType: 'JV_COMPANY',
        entityId: id,
        oldValues: existingJV,
        newValues: updateData,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Notify if equity structure changed significantly
    if (updateData.indigenousEquity && 
        Math.abs(existingJV.indigenousEquity - updateData.indigenousEquity) >= 5) {
      const jvCoordinators = await req.prisma.user.findMany({
        where: { role: 'JV_COORDINATOR', isActive: true }
      });

      for (const coordinator of jvCoordinators) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: coordinator.id,
          sentById: req.user.userId,
          title: 'JV Equity Structure Changed',
          message: `JV company ${updatedJV.name} equity structure has been updated. Indigenous equity changed from ${existingJV.indigenousEquity}% to ${updateData.indigenousEquity}%.`,
          email: coordinator.email,
          emailSubject: 'PC-OTS - JV Equity Structure Change',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.json({
      message: 'JV company updated successfully',
      jvCompany: updatedJV
    });
  } catch (error) {
    console.error('Update JV company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete JV company
router.delete('/:id', authenticate, authorize(['ADMIN', 'JV_COORDINATOR']), async (req, res) => {
  try {
    const { id } = req.params;

    // Get existing JV company
    const jvCompany = await req.prisma.jVCompany.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            documents: true
          }
        }
      }
    });

    if (!jvCompany) {
      return res.status(404).json({ error: 'JV company not found' });
    }

    await req.prisma.jVCompany.delete({
      where: { id }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'DELETE_JV_COMPANY',
        entityType: 'JV_COMPANY',
        entityId: id,
        oldValues: jvCompany,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'JV company deleted successfully' });
  } catch (error) {
    console.error('Delete JV company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get JV statistics
router.get('/stats/overview', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER', 'JV_COORDINATOR']), async (req, res) => {
  try {
    const [totalJVs, avgIndigenousEquity, equityDistribution, recentJVs, topCompanies] = await Promise.all([
      req.prisma.jVCompany.count(),
      req.prisma.jVCompany.aggregate({
        _avg: {
          indigenousEquity: true,
          foreignEquity: true
        }
      }),
      req.prisma.jVCompany.findMany({
        select: {
          indigenousEquity: true,
          foreignEquity: true
        }
      }),
      req.prisma.jVCompany.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          registrationNumber: true,
          indigenousEquity: true,
          foreignEquity: true,
          createdAt: true,
          company: {
            select: {
              name: true
            }
          }
        }
      }),
      req.prisma.company.findMany({
        include: {
          _count: {
            select: {
              jvCompanies: true
            }
          }
        },
        orderBy: {
          jvCompanies: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ]);

    // Calculate equity ranges
    const equityRanges = {
      'high_indigenous': equityDistribution.filter(jv => jv.indigenousEquity >= 70).length,
      'medium_indigenous': equityDistribution.filter(jv => jv.indigenousEquity >= 40 && jv.indigenousEquity < 70).length,
      'low_indigenous': equityDistribution.filter(jv => jv.indigenousEquity < 40).length
    };

    res.json({
      totalJVs,
      avgIndigenousEquity: avgIndigenousEquity._avg.indigenousEquity || 0,
      avgForeignEquity: avgIndigenousEquity._avg.foreignEquity || 0,
      equityRanges,
      recentJVs,
      topCompanies: topCompanies.map(company => ({
        id: company.id,
        name: company.name,
        jvCount: company._count.jvCompanies
      }))
    });
  } catch (error) {
    console.error('Get JV stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get equity compliance report
router.get('/compliance/equity-report', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER', 'JV_COORDINATOR']), async (req, res) => {
  try {
    const { minIndigenousEquity = 30 } = req.query;

    const jvCompanies = await req.prisma.jVCompany.findMany({
      include: {
        company: {
          select: {
            name: true,
            registrationNumber: true
          }
        }
      },
      orderBy: { indigenousEquity: 'asc' }
    });

    const compliantJVs = jvCompanies.filter(jv => jv.indigenousEquity >= parseFloat(minIndigenousEquity));
    const nonCompliantJVs = jvCompanies.filter(jv => jv.indigenousEquity < parseFloat(minIndigenousEquity));

    res.json({
      totalJVs: jvCompanies.length,
      compliantJVs: {
        count: compliantJVs.length,
        percentage: jvCompanies.length > 0 ? (compliantJVs.length / jvCompanies.length * 100).toFixed(2) : 0,
        companies: compliantJVs
      },
      nonCompliantJVs: {
        count: nonCompliantJVs.length,
        percentage: jvCompanies.length > 0 ? (nonCompliantJVs.length / jvCompanies.length * 100).toFixed(2) : 0,
        companies: nonCompliantJVs
      },
      minIndigenousEquity: parseFloat(minIndigenousEquity)
    });
  } catch (error) {
    console.error('Get equity compliance report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk JV operations
router.post('/bulk-action', authenticate, authorize(['ADMIN', 'JV_COORDINATOR']), async (req, res) => {
  try {
    const { action, jvIds, data } = req.body;

    if (!action || !jvIds || !Array.isArray(jvIds)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    let result;
    switch (action) {
      case 'update_equity':
        if (!data.indigenousEquity || !data.foreignEquity) {
          return res.status(400).json({ error: 'Both indigenous and foreign equity are required' });
        }
        if (data.indigenousEquity + data.foreignEquity !== 100) {
          return res.status(400).json({ error: 'Equity percentages must total 100%' });
        }
        result = await req.prisma.jVCompany.updateMany({
          where: { id: { in: jvIds } },
          data: {
            indigenousEquity: data.indigenousEquity,
            foreignEquity: data.foreignEquity
          }
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    // Log the bulk action
    await req.prisma.auditLog.create({
      data: {
        action: `BULK_${action.toUpperCase()}_JV`,
        entityType: 'JV_COMPANY',
        entityId: 'BULK',
        newValues: { jvIds, action, data },
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
    console.error('Bulk JV action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;