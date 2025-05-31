const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// Create LC Plan
router.post('/plans', authenticate, async (req, res) => {
  try {
    const {
      year,
      employmentPlan,
      trainingPlan,
      successionPlan,
      rndPlan,
      techTransferPlan,
      insurancePlan,
      legalServicesPlan,
      financialServicesPlan,
      indigenousBankPlan,
      attachments
    } = req.body;

    // Get user's company
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    const lcPlan = await req.prisma.lCPlan.create({
      data: {
        companyId: user.company.id,
        year: parseInt(year),
        employmentPlan,
        trainingPlan,
        successionPlan,
        rndPlan,
        techTransferPlan,
        insurancePlan,
        legalServicesPlan,
        financialServicesPlan,
        indigenousBankPlan,
        attachments: attachments || {},
        status: 'SUBMITTED'
      }
    });

    res.status(201).json({
      message: 'LC Plan submitted successfully',
      lcPlan
    });
  } catch (error) {
    console.error('LC Plan creation error:', error);
    res.status(500).json({ error: 'Failed to create LC Plan' });
  }
});

// Get LC Plans for company
router.get('/plans', authenticate, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    const lcPlans = await req.prisma.lCPlan.findMany({
      where: { companyId: user.company.id },
      orderBy: { year: 'desc' }
    });

    res.json({ lcPlans });
  } catch (error) {
    console.error('Get LC Plans error:', error);
    res.status(500).json({ error: 'Failed to retrieve LC Plans' });
  }
});

// Get all LC Plans (for reviewers)
router.get('/plans/all', authenticate, async (req, res) => {
  try {
    // Check if user has permission to view all plans
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view all LC Plans' });
    }

    const lcPlans = await req.prisma.lCPlan.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            registrationNumber: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ lcPlans });
  } catch (error) {
    console.error('Get all LC Plans error:', error);
    res.status(500).json({ error: 'Failed to retrieve LC Plans' });
  }
});

// Update LC Plan status
router.patch('/plans/:planId/status', authenticate, async (req, res) => {
  try {
    const { planId } = req.params;
    const { status, reviewComments } = req.body;

    // Check if user has permission to update status
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to update LC Plan status' });
    }

    const updatedPlan = await req.prisma.lCPlan.update({
      where: { id: planId },
      data: {
        status,
        reviewComments,
        reviewedBy: req.user.id,
        reviewedAt: new Date()
      }
    });

    res.json({
      message: 'LC Plan status updated successfully',
      lcPlan: updatedPlan
    });
  } catch (error) {
    console.error('Update LC Plan status error:', error);
    res.status(500).json({ error: 'Failed to update LC Plan status' });
  }
});

// Create LC Performance Report
router.post('/performance-reports', authenticate, async (req, res) => {
  try {
    const {
      year,
      quarter,
      localizationData,
      supplyChainData,
      investmentsData,
      spendBreakdown,
      contractsData,
      appendices,
      declaration
    } = req.body;

    // Get user's company
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    const performanceReport = await req.prisma.lCPerformanceReport.create({
      data: {
        companyId: user.company.id,
        year: parseInt(year),
        quarter: quarter || null,
        localizationData,
        supplyChainData,
        investmentsData,
        spendBreakdown,
        contractsData,
        appendices: appendices || {},
        declaration,
        status: 'SUBMITTED'
      }
    });

    res.status(201).json({
      message: 'LC Performance Report submitted successfully',
      performanceReport
    });
  } catch (error) {
    console.error('LC Performance Report creation error:', error);
    res.status(500).json({ error: 'Failed to create LC Performance Report' });
  }
});

// Get LC Performance Reports for company
router.get('/performance-reports', authenticate, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    const performanceReports = await req.prisma.lCPerformanceReport.findMany({
      where: { companyId: user.company.id },
      orderBy: { year: 'desc' }
    });

    res.json({ performanceReports });
  } catch (error) {
    console.error('Get LC Performance Reports error:', error);
    res.status(500).json({ error: 'Failed to retrieve LC Performance Reports' });
  }
});

// Get all LC Performance Reports (for reviewers)
router.get('/performance-reports/all', authenticate, async (req, res) => {
  try {
    // Check if user has permission to view all reports
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view all LC Performance Reports' });
    }

    const performanceReports = await req.prisma.lCPerformanceReport.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            registrationNumber: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ performanceReports });
  } catch (error) {
    console.error('Get all LC Performance Reports error:', error);
    res.status(500).json({ error: 'Failed to retrieve LC Performance Reports' });
  }
});

// Update LC Performance Report status
router.patch('/performance-reports/:reportId/status', authenticate, async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, reviewComments } = req.body;

    // Check if user has permission to update status
    if (!['ADMIN', 'COMPLIANCE_OFFICER', 'INSPECTOR'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to update LC Performance Report status' });
    }

    const updatedReport = await req.prisma.lCPerformanceReport.update({
      where: { id: reportId },
      data: {
        status,
        reviewComments,
        reviewedBy: req.user.id,
        reviewedAt: new Date()
      }
    });

    res.json({
      message: 'LC Performance Report status updated successfully',
      performanceReport: updatedReport
    });
  } catch (error) {
    console.error('Update LC Performance Report status error:', error);
    res.status(500).json({ error: 'Failed to update LC Performance Report status' });
  }
});

module.exports = router;