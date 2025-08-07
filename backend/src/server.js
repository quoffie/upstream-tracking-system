const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const permitRoutes = require('./routes/permit.routes');
const personnelRoutes = require('./routes/personnel.routes');
const jvRoutes = require('./routes/jv.routes');
const lcRoutes = require('./routes/localcontent.routes');
const documentRoutes = require('./routes/document.routes');
const notificationRoutes = require('./routes/notification.routes');
const paymentRoutes = require('./routes/payment.routes');
const inspectionRoutes = require('./routes/inspection.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Import services
const cronService = require('./services/cron.service');

// Initialize Express app
const app = express();

// Initialize Prisma client with error handling
let prisma;
try {
  prisma = new PrismaClient();
  console.log('Prisma client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Prisma client:', error.message);
  prisma = null;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Prisma to request object with error handling
app.use((req, res, next) => {
  req.prisma = prisma;
  req.prismaAvailable = prisma !== null;
  next();
});

// Middleware to check Prisma availability for database operations
app.use('/api', (req, res, next) => {
  if (!req.prismaAvailable && req.method !== 'GET') {
    return res.status(503).json({ 
      error: 'Database service temporarily unavailable',
      message: 'Prisma client initialization failed'
    });
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/permits', permitRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/jv', jvRoutes);
app.use('/api/localcontent', lcRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Initialize cron jobs
  cronService.initJobs();
  console.log('Cron service initialized');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    // Stop cron jobs
    cronService.stopJobs();
    // Close database connection
    prisma.$disconnect();
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

module.exports = app;