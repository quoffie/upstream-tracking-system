const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const notificationService = require('./notification.service');

/**
 * Cron Service
 * Handles scheduled tasks for the application
 */
class CronService {
  constructor() {
    this.prisma = new PrismaClient();
    this.jobs = [];
  }

  /**
   * Initialize all cron jobs
   */
  initJobs() {
    // Check for permit expirations daily at 8:00 AM
    this.jobs.push(
      cron.schedule('0 8 * * *', () => {
        console.log('Running permit expiration check...');
        this.checkPermitExpirations();
      })
    );

    // Check for unacknowledged alerts every 4 hours
    this.jobs.push(
      cron.schedule('0 */4 * * *', () => {
        console.log('Running alert escalation check...');
        this.checkAlertEscalations();
      })
    );

    // Check for upcoming LC performance reports weekly on Monday at 9:00 AM
    this.jobs.push(
      cron.schedule('0 9 * * 1', () => {
        console.log('Running LC performance report check...');
        this.checkUpcomingLCReports();
      })
    );

    // Check for upcoming inspections daily at 7:00 AM
    this.jobs.push(
      cron.schedule('0 7 * * *', () => {
        console.log('Running inspection reminder check...');
        this.checkUpcomingInspections();
      })
    );

    console.log('All cron jobs initialized');
  }

  /**
   * Stop all cron jobs
   */
  stopJobs() {
    this.jobs.forEach(job => job.stop());
    console.log('All cron jobs stopped');
  }

  /**
   * Check for permits approaching expiration and send notifications
   */
  async checkPermitExpirations() {
    try {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      
      // Find permits expiring in the next 30 days
      const expiringPermits = await this.prisma.permit.findMany({
        where: {
          status: 'APPROVED',
          expiryDate: {
            gte: today,
            lte: thirtyDaysFromNow
          },
          // Exclude permits that already have renewal notifications in the last 7 days
          NOT: {
            notifications: {
              some: {
                title: 'Permit Expiration Warning',
                createdAt: {
                  gte: new Date(new Date().setDate(new Date().getDate() - 7))
                }
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
      
      console.log(`Found ${expiringPermits.length} permits expiring soon`);
      
      // Send notifications for each expiring permit
      for (const permit of expiringPermits) {
        // Calculate days until expiration
        const daysUntilExpiry = Math.ceil((permit.expiryDate - today) / (1000 * 60 * 60 * 24));
        
        // Find admin user to set as sender
        const adminUser = await this.prisma.user.findFirst({
          where: { role: 'ADMIN' }
        });
        
        if (!adminUser) {
          console.error('No admin user found to send notifications');
          continue;
        }
        
        // Notify company users
        for (const user of permit.company.users) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: user.id,
            sentById: adminUser.id,
            title: 'Permit Expiration Warning',
            message: `Your ${permit.type} permit (${permit.permitNumber}) will expire in ${daysUntilExpiry} days. Please submit a renewal application.`,
            email: user.email,
            emailSubject: 'Important: Permit Expiration Notice',
            phone: user.phone,
            smsMessage: `PC-OTS: Your permit ${permit.permitNumber} expires in ${daysUntilExpiry} days. Please renew soon.`,
            channels: ['IN_APP', 'EMAIL', 'SMS']
          });
        }
        
        // Also notify compliance officers about expiring permits
        const complianceOfficers = await this.prisma.user.findMany({
          where: { role: 'COMPLIANCE' }
        });
        
        for (const officer of complianceOfficers) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: officer.id,
            sentById: adminUser.id,
            title: 'Permit Expiration Alert',
            message: `${permit.company.name}'s ${permit.type} permit (${permit.permitNumber}) will expire in ${daysUntilExpiry} days.`,
            email: officer.email,
            channels: ['IN_APP', 'EMAIL']
          });
        }
      }
      
      console.log('Permit expiration notifications sent successfully');
    } catch (error) {
      console.error('Error checking permit expirations:', error);
    }
  }

  /**
   * Check for unacknowledged alerts that need escalation
   */
  async checkAlertEscalations() {
    try {
      const escalationThresholdHours = 24; // Escalate after 24 hours
      const now = new Date();
      const escalationThreshold = new Date(now.getTime() - (escalationThresholdHours * 60 * 60 * 1000));
      
      // Find unread important notifications older than threshold
      const unacknowledgedAlerts = await this.prisma.notification.findMany({
        where: {
          isRead: false,
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
      
      console.log(`Found ${unacknowledgedAlerts.length} unacknowledged alerts`);
      
      // Group alerts by role for escalation
      const alertsByRole = {};
      for (const alert of unacknowledgedAlerts) {
        const role = alert.user.role;
        if (!alertsByRole[role]) {
          alertsByRole[role] = [];
        }
        alertsByRole[role].push(alert);
      }
      
      // Find admin user to set as sender
      const adminUser = await this.prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      
      if (!adminUser) {
        console.error('No admin user found to send escalations');
        return;
      }
      
      // Escalate to supervisors/admins
      for (const [role, alerts] of Object.entries(alertsByRole)) {
        // Find supervisors/admins to escalate to
        const supervisors = await this.prisma.user.findMany({
          where: {
            role: 'ADMIN'
          }
        });
        
        if (supervisors.length > 0) {
          for (const supervisor of supervisors) {
            // Skip if the supervisor is the same as the sender
            if (supervisor.id === adminUser.id) continue;
            
            // Send escalation notification
            await notificationService.sendMultiChannelNotification(this.prisma, {
              userId: supervisor.id,
              sentById: adminUser.id,
              title: `Escalation: Unacknowledged ${role} Alerts`,
              message: `${alerts.length} important alerts for ${role} users have not been acknowledged for over ${escalationThresholdHours} hours.`,
              email: supervisor.email,
              channels: ['IN_APP', 'EMAIL']
            });
          }
        }
      }
      
      console.log('Alert escalations sent successfully');
    } catch (error) {
      console.error('Error checking alert escalations:', error);
    }
  }

  /**
   * Check for upcoming LC performance reports
   */
  async checkUpcomingLCReports() {
    try {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      
      // Find LC reports due in the next 30 days
      const upcomingReports = await this.prisma.lcPerformanceReport.findMany({
        where: {
          dueDate: {
            gte: today,
            lte: thirtyDaysFromNow
          },
          submitted: false,
          // Exclude reports that already have notifications in the last 7 days
          NOT: {
            permit: {
              company: {
                users: {
                  some: {
                    notifications: {
                      some: {
                        title: 'LC Performance Report Due Soon',
                        createdAt: {
                          gte: new Date(new Date().setDate(new Date().getDate() - 7))
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        include: {
          permit: {
            include: {
              company: {
                include: {
                  users: true
                }
              }
            }
          }
        }
      });
      
      console.log(`Found ${upcomingReports.length} LC reports due soon`);
      
      // Find admin user to set as sender
      const adminUser = await this.prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      
      if (!adminUser) {
        console.error('No admin user found to send notifications');
        return;
      }
      
      // Send notifications for each upcoming report
      for (const report of upcomingReports) {
        // Calculate days until due date
        const daysUntilDue = Math.ceil((report.dueDate - today) / (1000 * 60 * 60 * 24));
        
        // Notify company users
        for (const user of report.permit.company.users) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: user.id,
            sentById: adminUser.id,
            title: 'LC Performance Report Due Soon',
            message: `Your Local Content Performance Report for permit ${report.permit.permitNumber} is due in ${daysUntilDue} days.`,
            email: user.email,
            channels: ['IN_APP', 'EMAIL']
          });
        }
        
        // Notify LC officers
        const lcOfficers = await this.prisma.user.findMany({
          where: { role: 'LOCAL_CONTENT' }
        });
        
        for (const officer of lcOfficers) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: officer.id,
            sentById: adminUser.id,
            title: 'Upcoming LC Report',
            message: `${report.permit.company.name}'s LC Performance Report for permit ${report.permit.permitNumber} is due in ${daysUntilDue} days.`,
            email: officer.email,
            channels: ['IN_APP', 'EMAIL']
          });
        }
      }
      
      console.log('LC report notifications sent successfully');
    } catch (error) {
      console.error('Error checking upcoming LC reports:', error);
    }
  }

  /**
   * Check for upcoming inspections
   */
  async checkUpcomingInspections() {
    try {
      const today = new Date();
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);
      
      // Find inspections scheduled in the next 3 days
      const upcomingInspections = await this.prisma.inspection.findMany({
        where: {
          scheduledDate: {
            gte: today,
            lte: threeDaysFromNow
          },
          status: 'SCHEDULED',
          // Exclude inspections that already have notifications in the last 24 hours
          NOT: {
            permit: {
              company: {
                users: {
                  some: {
                    notifications: {
                      some: {
                        title: 'Upcoming Inspection',
                        createdAt: {
                          gte: new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        include: {
          permit: {
            include: {
              company: {
                include: {
                  users: true
                }
              }
            }
          },
          inspector: true
        }
      });
      
      console.log(`Found ${upcomingInspections.length} upcoming inspections`);
      
      // Find admin user to set as sender
      const adminUser = await this.prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      
      if (!adminUser) {
        console.error('No admin user found to send notifications');
        return;
      }
      
      // Send notifications for each upcoming inspection
      for (const inspection of upcomingInspections) {
        // Format date for display
        const inspectionDate = inspection.scheduledDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        const inspectionTime = inspection.scheduledDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Notify company users
        for (const user of inspection.permit.company.users) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: user.id,
            sentById: adminUser.id,
            title: 'Upcoming Inspection',
            message: `You have an inspection scheduled for ${inspectionDate} at ${inspectionTime} for permit ${inspection.permit.permitNumber}.`,
            email: user.email,
            emailSubject: 'Reminder: Upcoming Inspection',
            phone: user.phone,
            smsMessage: `PC-OTS: Inspection scheduled for ${inspectionDate} at ${inspectionTime} for permit ${inspection.permit.permitNumber}.`,
            channels: ['IN_APP', 'EMAIL', 'SMS']
          });
        }
        
        // Notify the assigned inspector
        if (inspection.inspector) {
          await notificationService.sendMultiChannelNotification(this.prisma, {
            userId: inspection.inspector.id,
            sentById: adminUser.id,
            title: 'Upcoming Inspection Assignment',
            message: `You are assigned to inspect ${inspection.permit.company.name} on ${inspectionDate} at ${inspectionTime} for permit ${inspection.permit.permitNumber}.`,
            email: inspection.inspector.email,
            channels: ['IN_APP', 'EMAIL']
          });
        }
      }
      
      console.log('Inspection notifications sent successfully');
    } catch (error) {
      console.error('Error checking upcoming inspections:', error);
    }
  }
}

module.exports = new CronService();