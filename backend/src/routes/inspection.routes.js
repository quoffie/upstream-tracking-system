const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// Schedule inspection
router.post('/schedule', authenticate, async (req, res) => {
  try {
    const {
      companyId,
      type,
      scheduledDate,
      location,
      purpose,
      inspectorIds,
      requirements
    } = req.body;

    // Check if user has permission to schedule inspections
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to schedule inspections' });
    }

    const inspection = await req.prisma.inspection.create({
      data: {
        companyId,
        type,
        scheduledDate: new Date(scheduledDate),
        location,
        purpose,
        requirements: requirements || {},
        status: 'SCHEDULED',
        scheduledBy: req.user.id
      }
    });

    // Assign inspectors if provided
    if (inspectorIds && inspectorIds.length > 0) {
      await req.prisma.inspectionAssignment.createMany({
        data: inspectorIds.map(inspectorId => ({
          inspectionId: inspection.id,
          inspectorId,
          assignedBy: req.user.id
        }))
      });
    }

    // Create notification for company
    await req.prisma.notification.create({
      data: {
        type: 'INSPECTION_SCHEDULED',
        title: 'Inspection Scheduled',
        message: `An inspection has been scheduled for ${new Date(scheduledDate).toLocaleDateString()}`,
        companyId,
        relatedId: inspection.id
      }
    });

    res.status(201).json({
      message: 'Inspection scheduled successfully',
      inspection
    });
  } catch (error) {
    console.error('Schedule inspection error:', error);
    res.status(500).json({ error: 'Failed to schedule inspection' });
  }
});

// Get inspections for company
router.get('/company/:companyId', authenticate, async (req, res) => {
  try {
    const { companyId } = req.params;

    // Check if user has permission to view inspections
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (user.company?.id !== companyId && !['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view these inspections' });
    }

    const inspections = await req.prisma.inspection.findMany({
      where: { companyId },
      include: {
        assignments: {
          include: {
            inspector: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        scheduledByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { scheduledDate: 'desc' }
    });

    res.json({ inspections });
  } catch (error) {
    console.error('Get inspections error:', error);
    res.status(500).json({ error: 'Failed to retrieve inspections' });
  }
});

// Get all inspections (for inspectors/admins)
router.get('/all', authenticate, async (req, res) => {
  try {
    // Check if user has permission to view all inspections
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view all inspections' });
    }

    const inspections = await req.prisma.inspection.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            registrationNumber: true
          }
        },
        assignments: {
          include: {
            inspector: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { scheduledDate: 'desc' }
    });

    res.json({ inspections });
  } catch (error) {
    console.error('Get all inspections error:', error);
    res.status(500).json({ error: 'Failed to retrieve inspections' });
  }
});

// Update inspection status
router.patch('/:inspectionId/status', authenticate, async (req, res) => {
  try {
    const { inspectionId } = req.params;
    const { status, notes } = req.body;

    // Check if user has permission to update inspection status
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to update inspection status' });
    }

    const updatedInspection = await req.prisma.inspection.update({
      where: { id: inspectionId },
      data: {
        status,
        notes,
        updatedAt: new Date()
      }
    });

    // Create notification for status change
    const inspection = await req.prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: { company: true }
    });

    if (inspection) {
      await req.prisma.notification.create({
        data: {
          type: 'INSPECTION_STATUS_UPDATED',
          title: 'Inspection Status Updated',
          message: `Inspection status has been updated to ${status}`,
          companyId: inspection.companyId,
          relatedId: inspectionId
        }
      });
    }

    res.json({
      message: 'Inspection status updated successfully',
      inspection: updatedInspection
    });
  } catch (error) {
    console.error('Update inspection status error:', error);
    res.status(500).json({ error: 'Failed to update inspection status' });
  }
});

// Create inspection report
router.post('/:inspectionId/report', authenticate, async (req, res) => {
  try {
    const { inspectionId } = req.params;
    const {
      findings,
      recommendations,
      complianceStatus,
      followUpRequired,
      followUpDate,
      attachments
    } = req.body;

    // Check if user has permission to create inspection reports
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to create inspection reports' });
    }

    // Verify inspection exists
    const inspection = await req.prisma.inspection.findUnique({
      where: { id: inspectionId }
    });

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    const report = await req.prisma.inspectionReport.create({
      data: {
        inspectionId,
        findings,
        recommendations,
        complianceStatus,
        followUpRequired: followUpRequired || false,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        attachments: attachments || {},
        createdBy: req.user.id
      }
    });

    // Update inspection status to completed
    await req.prisma.inspection.update({
      where: { id: inspectionId },
      data: { status: 'COMPLETED' }
    });

    // Create notification for report completion
    await req.prisma.notification.create({
      data: {
        type: 'INSPECTION_COMPLETED',
        title: 'Inspection Report Available',
        message: 'An inspection report has been completed and is available for review',
        companyId: inspection.companyId,
        relatedId: report.id
      }
    });

    res.status(201).json({
      message: 'Inspection report created successfully',
      report
    });
  } catch (error) {
    console.error('Create inspection report error:', error);
    res.status(500).json({ error: 'Failed to create inspection report' });
  }
});

// Get inspection reports
router.get('/:inspectionId/reports', authenticate, async (req, res) => {
  try {
    const { inspectionId } = req.params;

    const reports = await req.prisma.inspectionReport.findMany({
      where: { inspectionId },
      include: {
        createdByUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ reports });
  } catch (error) {
    console.error('Get inspection reports error:', error);
    res.status(500).json({ error: 'Failed to retrieve inspection reports' });
  }
});

// Assign inspector to inspection
router.post('/:inspectionId/assign', authenticate, async (req, res) => {
  try {
    const { inspectionId } = req.params;
    const { inspectorId } = req.body;

    // Check if user has permission to assign inspectors
    if (!['ADMIN', 'COMPLIANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to assign inspectors' });
    }

    // Check if inspector is already assigned
    const existingAssignment = await req.prisma.inspectionAssignment.findFirst({
      where: {
        inspectionId,
        inspectorId
      }
    });

    if (existingAssignment) {
      return res.status(400).json({ error: 'Inspector already assigned to this inspection' });
    }

    const assignment = await req.prisma.inspectionAssignment.create({
      data: {
        inspectionId,
        inspectorId,
        assignedBy: req.user.id
      }
    });

    res.status(201).json({
      message: 'Inspector assigned successfully',
      assignment
    });
  } catch (error) {
    console.error('Assign inspector error:', error);
    res.status(500).json({ error: 'Failed to assign inspector' });
  }
});

module.exports = router;