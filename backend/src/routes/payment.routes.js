const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const crypto = require('crypto');

const router = express.Router();

// Create payment
router.post('/create', authenticate, async (req, res) => {
  try {
    const {
      applicationId,
      amount,
      currency,
      description,
      paymentMethod
    } = req.body;

    // Get user's company
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    // Generate payment reference
    const paymentReference = `PAY-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const payment = await req.prisma.payment.create({
      data: {
        applicationId,
        companyId: user.company.id,
        amount: parseFloat(amount),
        currency: currency || 'GHS',
        description,
        paymentMethod,
        paymentReference,
        status: 'PENDING',
        createdBy: req.user.id
      }
    });

    // Create notification
    await req.prisma.notification.create({
      data: {
        type: 'PAYMENT_CREATED',
        title: 'Payment Created',
        message: `Payment of ${currency || 'GHS'} ${amount} has been created with reference ${paymentReference}`,
        companyId: user.company.id,
        relatedId: payment.id
      }
    });

    res.status(201).json({
      message: 'Payment created successfully',
      payment: {
        id: payment.id,
        paymentReference: payment.paymentReference,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        createdAt: payment.createdAt
      }
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Get payments for company
router.get('/company', authenticate, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (!user.company) {
      return res.status(400).json({ error: 'User must be associated with a company' });
    }

    const payments = await req.prisma.payment.findMany({
      where: { companyId: user.company.id },
      include: {
        application: {
          select: {
            id: true,
            type: true,
            applicationNumber: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ payments });
  } catch (error) {
    console.error('Get company payments error:', error);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
});

// Get all payments (for admins)
router.get('/all', authenticate, async (req, res) => {
  try {
    // Check if user has permission to view all payments
    if (!['ADMIN', 'FINANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view all payments' });
    }

    const payments = await req.prisma.payment.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            registrationNumber: true
          }
        },
        application: {
          select: {
            id: true,
            type: true,
            applicationNumber: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ payments });
  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
});

// Get payment by reference
router.get('/reference/:paymentReference', authenticate, async (req, res) => {
  try {
    const { paymentReference } = req.params;

    const payment = await req.prisma.payment.findUnique({
      where: { paymentReference },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            registrationNumber: true
          }
        },
        application: {
          select: {
            id: true,
            type: true,
            applicationNumber: true
          }
        }
      }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check if user has permission to view this payment
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (payment.companyId !== user.company?.id && !['ADMIN', 'FINANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view this payment' });
    }

    res.json({ payment });
  } catch (error) {
    console.error('Get payment by reference error:', error);
    res.status(500).json({ error: 'Failed to retrieve payment' });
  }
});

// Update payment status
router.patch('/:paymentId/status', authenticate, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, transactionId, gatewayResponse, notes } = req.body;

    // Check if user has permission to update payment status
    if (!['ADMIN', 'FINANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to update payment status' });
    }

    const updateData = {
      status,
      updatedAt: new Date()
    };

    if (transactionId) updateData.transactionId = transactionId;
    if (gatewayResponse) updateData.gatewayResponse = gatewayResponse;
    if (notes) updateData.notes = notes;
    if (status === 'COMPLETED') updateData.paidAt = new Date();

    const updatedPayment = await req.prisma.payment.update({
      where: { id: paymentId },
      data: updateData
    });

    // Create notification for payment status change
    const payment = await req.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { company: true }
    });

    if (payment) {
      await req.prisma.notification.create({
        data: {
          type: 'PAYMENT_STATUS_UPDATED',
          title: 'Payment Status Updated',
          message: `Payment ${payment.paymentReference} status has been updated to ${status}`,
          companyId: payment.companyId,
          relatedId: paymentId
        }
      });
    }

    res.json({
      message: 'Payment status updated successfully',
      payment: updatedPayment
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Process payment webhook (for payment gateways)
router.post('/webhook', async (req, res) => {
  try {
    const { paymentReference, status, transactionId, amount, gatewayResponse } = req.body;

    // Verify webhook signature here if needed
    // const signature = req.headers['x-webhook-signature'];
    // if (!verifyWebhookSignature(req.body, signature)) {
    //   return res.status(401).json({ error: 'Invalid webhook signature' });
    // }

    const payment = await req.prisma.payment.findUnique({
      where: { paymentReference }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Update payment status
    const updatedPayment = await req.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status,
        transactionId,
        gatewayResponse,
        paidAt: status === 'COMPLETED' ? new Date() : null,
        updatedAt: new Date()
      }
    });

    // Create notification
    await req.prisma.notification.create({
      data: {
        type: 'PAYMENT_STATUS_UPDATED',
        title: 'Payment Status Updated',
        message: `Payment ${paymentReference} has been ${status.toLowerCase()}`,
        companyId: payment.companyId,
        relatedId: payment.id
      }
    });

    res.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Payment webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Generate payment receipt
router.get('/:paymentId/receipt', authenticate, async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await req.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        company: true,
        application: true
      }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check if user has permission to view this payment
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.id },
      include: { company: true }
    });

    if (payment.companyId !== user.company?.id && !['ADMIN', 'FINANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view this payment receipt' });
    }

    if (payment.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Receipt only available for completed payments' });
    }

    // Generate receipt data
    const receipt = {
      receiptNumber: `RCP-${payment.paymentReference}`,
      paymentReference: payment.paymentReference,
      transactionId: payment.transactionId,
      company: {
        name: payment.company.name,
        registrationNumber: payment.company.registrationNumber
      },
      application: payment.application ? {
        type: payment.application.type,
        applicationNumber: payment.application.applicationNumber
      } : null,
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      paidAt: payment.paidAt,
      paymentMethod: payment.paymentMethod
    };

    res.json({ receipt });
  } catch (error) {
    console.error('Generate receipt error:', error);
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

// Get payment statistics
router.get('/statistics', authenticate, async (req, res) => {
  try {
    // Check if user has permission to view payment statistics
    if (!['ADMIN', 'FINANCE_OFFICER'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to view payment statistics' });
    }

    const { startDate, endDate } = req.query;

    const whereClause = {};
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const [totalPayments, completedPayments, pendingPayments, failedPayments, totalAmount] = await Promise.all([
      req.prisma.payment.count({ where: whereClause }),
      req.prisma.payment.count({ where: { ...whereClause, status: 'COMPLETED' } }),
      req.prisma.payment.count({ where: { ...whereClause, status: 'PENDING' } }),
      req.prisma.payment.count({ where: { ...whereClause, status: 'FAILED' } }),
      req.prisma.payment.aggregate({
        where: { ...whereClause, status: 'COMPLETED' },
        _sum: { amount: true }
      })
    ]);

    const statistics = {
      totalPayments,
      completedPayments,
      pendingPayments,
      failedPayments,
      totalAmount: totalAmount._sum.amount || 0,
      completionRate: totalPayments > 0 ? (completedPayments / totalPayments * 100).toFixed(2) : 0
    };

    res.json({ statistics });
  } catch (error) {
    console.error('Get payment statistics error:', error);
    res.status(500).json({ error: 'Failed to retrieve payment statistics' });
  }
});

module.exports = router;