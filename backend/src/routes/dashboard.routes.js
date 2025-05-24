const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');

/**
 * Dashboard Routes
 * Handles dashboard data, alerts, and badges for different user roles
 */

// Get dashboard overview data
router.get('/overview', authenticate, async (req, res) => {
  try {
    const { role, userId } = req.user;
    const dashboardData = {};
    
    // Common statistics for all users
    const totalPermits = await req.prisma.permit.count();
    dashboardData.totalPermits = totalPermits;
    
    // Role-specific dashboard data
    if (role === 'ADMIN') {
      // Admin dashboard data
      const [pendingPermits, approvedPermits, rejectedPermits, companiesCount, usersCount] = await Promise.all([
        req.prisma.permit.count({ where: { status: 'PENDING' } }),
        req.prisma.permit.count({ where: { status: 'APPROVED' } }),
        req.prisma.permit.count({ where: { status: 'REJECTED' } }),
        req.prisma.company.count(),
        req.prisma.user.count()
      ]);
      
      dashboardData.pendingPermits = pendingPermits;
      dashboardData.approvedPermits = approvedPermits;
      dashboardData.rejectedPermits = rejectedPermits;
      dashboardData.companiesCount = companiesCount;
      dashboardData.usersCount = usersCount;
      
      // Get recent activity
      dashboardData.recentActivity = await req.prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true
            }
          }
        }
      });
    } else if (role === 'REVIEWER') {
      // Reviewer dashboard data
      const pendingReviews = await req.prisma.permit.count({
        where: { status: 'PENDING' }
      });
      
      dashboardData.pendingReviews = pendingReviews;
      
      // Get permits assigned to this reviewer
      dashboardData.assignedPermits = await req.prisma.permit.findMany({
        where: {
          OR: [
            { status: 'PENDING' },
            { status: 'IN_REVIEW' }
          ]
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          company: true
        }
      });
    } else if (role === 'COMPLIANCE') {
      // Compliance officer dashboard data
      const [complianceReviews, expiringPermits] = await Promise.all([
        req.prisma.permit.count({
          where: { status: 'COMPLIANCE_REVIEW' }
        }),
        req.prisma.permit.count({
          where: {
            status: 'APPROVED',
            expiryDate: {
              lte: new Date(new Date().setDate(new Date().getDate() + 30))
            }
          }
        })
      ]);
      
      dashboardData.complianceReviews = complianceReviews;
      dashboardData.expiringPermits = expiringPermits;
      
      // Get permits requiring compliance review
      dashboardData.compliancePermits = await req.prisma.permit.findMany({
        where: { status: 'COMPLIANCE_REVIEW' },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          company: true
        }
      });
    } else if (role === 'LOCAL_CONTENT') {
      // Local content officer dashboard data
      const lcReviews = await req.prisma.permit.count({
        where: { status: 'LOCAL_CONTENT_REVIEW' }
      });
      
      dashboardData.lcReviews = lcReviews;
      
      // Get permits requiring local content review
      dashboardData.lcPermits = await req.prisma.permit.findMany({
        where: { status: 'LOCAL_CONTENT_REVIEW' },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          company: true,
          lcPlan: true
        }
      });
      
      // Get LC performance reports due soon
      dashboardData.upcomingReports = await req.prisma.lcPerformanceReport.findMany({
        where: {
          dueDate: {
            lte: new Date(new Date().setDate(new Date().getDate() + 30))
          },
          submitted: false
        },
        take: 10,
        orderBy: { dueDate: 'asc' },
        include: {
          permit: {
            include: {
              company: true
            }
          }
        }
      });
    } else if (role === 'COMPANY') {
      // Company user dashboard data
      const userCompany = await req.prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true }
      });
      
      if (userCompany && userCompany.companyId) {
        const [companyPermits, pendingPermits, approvedPermits, expiringPermits] = await Promise.all([
          req.prisma.permit.count({
            where: { companyId: userCompany.companyId }
          }),
          req.prisma.permit.count({
            where: {
              companyId: userCompany.companyId,
              status: 'PENDING'
            }
          }),
          req.prisma.permit.count({
            where: {
              companyId: userCompany.companyId,
              status: 'APPROVED'
            }
          }),
          req.prisma.permit.count({
            where: {
              companyId: userCompany.companyId,
              status: 'APPROVED',
              expiryDate: {
                lte: new Date(new Date().setDate(new Date().getDate() + 30))
              }
            }
          })
        ]);
        
        dashboardData.companyPermits = companyPermits;
        dashboardData.pendingPermits = pendingPermits;
        dashboardData.approvedPermits = approvedPermits;
        dashboardData.expiringPermits = expiringPermits;
        
        // Get recent permits
        dashboardData.recentPermits = await req.prisma.permit.findMany({
          where: { companyId: userCompany.companyId },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            statusHistory: {
              orderBy: { createdAt: 'desc' },
              take: 1
            }
          }
        });
        
        // Get upcoming LC reports
        dashboardData.upcomingReports = await req.prisma.lcPerformanceReport.findMany({
          where: {
            permit: {
              companyId: userCompany.companyId
            },
            dueDate: {
              lte: new Date(new Date().setDate(new Date().getDate() + 30))
            },
            submitted: false
          },
          take: 5,
          orderBy: { dueDate: 'asc' },
          include: {
            permit: true
          }
        });
      }
    }
    
    res.status(200).json({
      status: 'success',
      data: dashboardData
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch dashboard data'
    });
  }
});

// Get alerts and badges for the current user
router.get('/alerts', authenticate, async (req, res) => {
  try {
    const { role, userId } = req.user;
    const alerts = {};
    
    // Get unread notifications count
    const unreadNotifications = await req.prisma.notification.count({
      where: {
        userId,
        read: false
      }
    });
    
    alerts.unreadNotifications = unreadNotifications;
    
    // Role-specific alerts
    if (role === 'ADMIN') {
      // Admin alerts
      const [pendingApprovals, systemIssues] = await Promise.all([
        req.prisma.permit.count({
          where: { status: 'PENDING' }
        }),
        req.prisma.auditLog.count({
          where: {
            action: { contains: 'ERROR' },
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
          }
        })
      ]);
      
      alerts.pendingApprovals = pendingApprovals;
      alerts.systemIssues = systemIssues;
    } else if (role === 'REVIEWER') {
      // Reviewer alerts
      const pendingReviews = await req.prisma.permit.count({
        where: { status: 'PENDING' }
      });
      
      alerts.pendingReviews = pendingReviews;
    } else if (role === 'COMPLIANCE') {
      // Compliance officer alerts
      const [complianceReviews, expiringPermits, overdueInspections] = await Promise.all([
        req.prisma.permit.count({
          where: { status: 'COMPLIANCE_REVIEW' }
        }),
        req.prisma.permit.count({
          where: {
            status: 'APPROVED',
            expiryDate: {
              lte: new Date(new Date().setDate(new Date().getDate() + 30))
            }
          }
        }),
        req.prisma.inspection.count({
          where: {
            scheduledDate: {
              lt: new Date()
            },
            status: 'SCHEDULED'
          }
        })
      ]);
      
      alerts.complianceReviews = complianceReviews;
      alerts.expiringPermits = expiringPermits;
      alerts.overdueInspections = overdueInspections;
    } else if (role === 'LOCAL_CONTENT') {
      // Local content officer alerts
      const [lcReviews, upcomingReports, overdueReports] = await Promise.all([
        req.prisma.permit.count({
          where: { status: 'LOCAL_CONTENT_REVIEW' }
        }),
        req.prisma.lcPerformanceReport.count({
          where: {
            dueDate: {
              lte: new Date(new Date().setDate(new Date().getDate() + 30)),
              gte: new Date()
            },
            submitted: false
          }
        }),
        req.prisma.lcPerformanceReport.count({
          where: {
            dueDate: {
              lt: new Date()
            },
            submitted: false
          }
        })
      ]);
      
      alerts.lcReviews = lcReviews;
      alerts.upcomingReports = upcomingReports;
      alerts.overdueReports = overdueReports;
    } else if (role === 'COMPANY') {
      // Company user alerts
      const userCompany = await req.prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true }
      });
      
      if (userCompany && userCompany.companyId) {
        const [returnsForCorrection, expiringPermits, upcomingReports, pendingPayments] = await Promise.all([
          req.prisma.permit.count({
            where: {
              companyId: userCompany.companyId,
              status: 'RETURNED'
            }
          }),
          req.prisma.permit.count({
            where: {
              companyId: userCompany.companyId,
              status: 'APPROVED',
              expiryDate: {
                lte: new Date(new Date().setDate(new Date().getDate() + 30))
              }
            }
          }),
          req.prisma.lcPerformanceReport.count({
            where: {
              permit: {
                companyId: userCompany.companyId
              },
              dueDate: {
                lte: new Date(new Date().setDate(new Date().getDate() + 30))
              },
              submitted: false
            }
          }),
          req.prisma.payment.count({
            where: {
              permit: {
                companyId: userCompany.companyId
              },
              status: 'PENDING'
            }
          })
        ]);
        
        alerts.returnsForCorrection = returnsForCorrection;
        alerts.expiringPermits = expiringPermits;
        alerts.upcomingReports = upcomingReports;
        alerts.pendingPayments = pendingPayments;
      }
    }
    
    res.status(200).json({
      status: 'success',
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch alerts'
    });
  }
});

// Get KPI metrics for admin dashboard
router.get('/kpi', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { period = '30days' } = req.query;
    let startDate;
    const endDate = new Date();
    
    // Calculate start date based on period
    if (period === '7days') {
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 7);
    } else if (period === '30days') {
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 30);
    } else if (period === '90days') {
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 90);
    } else if (period === '1year') {
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 1);
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid period. Use 7days, 30days, 90days, or 1year.'
      });
    }
    
    // Calculate KPIs
    const [totalSubmissions, approvedPermits, returnedPermits, avgProcessingTime] = await Promise.all([
      // Total submissions in period
      req.prisma.permit.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      
      // Approved permits in period
      req.prisma.permit.count({
        where: {
          status: 'APPROVED',
          statusHistory: {
            some: {
              status: 'APPROVED',
              createdAt: {
                gte: startDate,
                lte: endDate
              }
            }
          }
        }
      }),
      
      // Returned permits in period
      req.prisma.permit.count({
        where: {
          status: 'RETURNED',
          statusHistory: {
            some: {
              status: 'RETURNED',
              createdAt: {
                gte: startDate,
                lte: endDate
              }
            }
          }
        }
      }),
      
      // Calculate average processing time for approved permits
      req.prisma.$queryRaw`
        SELECT AVG(EXTRACT(EPOCH FROM (sh."createdAt" - p."createdAt")) / 86400) as avg_days
        FROM "Permit" p
        JOIN "StatusHistory" sh ON p.id = sh."permitId"
        WHERE sh.status = 'APPROVED'
        AND sh."createdAt" >= ${startDate}
        AND sh."createdAt" <= ${endDate}
      `
    ]);
    
    // Calculate on-time renewal rate
    const renewals = await req.prisma.permit.findMany({
      where: {
        type: { contains: 'RENEWAL' },
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        statusHistory: {
          where: {
            status: 'APPROVED'
          },
          orderBy: {
            createdAt: 'asc'
          },
          take: 1
        }
      }
    });
    
    let onTimeRenewals = 0;
    for (const renewal of renewals) {
      if (renewal.previousPermitId) {
        const previousPermit = await req.prisma.permit.findUnique({
          where: { id: renewal.previousPermitId }
        });
        
        if (previousPermit && previousPermit.expiryDate) {
          // If renewal was submitted before previous permit expired
          if (renewal.createdAt <= previousPermit.expiryDate) {
            onTimeRenewals++;
          }
        }
      }
    }
    
    const onTimeRenewalRate = renewals.length > 0 ? (onTimeRenewals / renewals.length) * 100 : 0;
    
    // Get Ghanaian vs expatriate staff ratios
    const personnelStats = await req.prisma.personnel.groupBy({
      by: ['nationality'],
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    
    let ghanaianCount = 0;
    let expatCount = 0;
    
    for (const stat of personnelStats) {
      if (stat.nationality === 'Ghanaian') {
        ghanaianCount = stat._count.id;
      } else {
        expatCount += stat._count.id;
      }
    }
    
    const totalPersonnel = ghanaianCount + expatCount;
    const ghanaianRatio = totalPersonnel > 0 ? (ghanaianCount / totalPersonnel) * 100 : 0;
    
    // Get total fees collected
    const payments = await req.prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    
    const totalFeesCollected = payments._sum.amount || 0;
    
    // Calculate SLA compliance rate
    const permitsWithinSLA = await req.prisma.permit.count({
      where: {
        statusHistory: {
          some: {
            status: 'APPROVED',
            createdAt: {
              gte: startDate,
              lte: endDate
            }
          }
        },
        // Assuming SLA is 14 days from submission to approval
        AND: [
          {
            statusHistory: {
              some: {
                status: 'APPROVED'
              }
            }
          },
          {
            statusHistory: {
              some: {
                status: 'APPROVED',
                createdAt: {
                  lte: req.prisma.raw(`"Permit"."createdAt" + interval '14 days'`)
                }
              }
            }
          }
        ]
      }
    });
    
    const slaComplianceRate = approvedPermits > 0 ? (permitsWithinSLA / approvedPermits) * 100 : 0;
    
    // Compile KPI data
    const kpiData = {
      totalSubmissions,
      approvedPermits,
      returnedPermits,
      errorRate: totalSubmissions > 0 ? (returnedPermits / totalSubmissions) * 100 : 0,
      avgProcessingDays: avgProcessingTime[0]?.avg_days || 0,
      onTimeRenewalRate,
      ghanaianRatio,
      expatriateRatio: 100 - ghanaianRatio,
      totalFeesCollected,
      slaComplianceRate
    };
    
    res.status(200).json({
      status: 'success',
      data: kpiData
    });
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch KPI data'
    });
  }
});

module.exports = router;