const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow PDF, JPG, PNG files
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

// Upload document
router.post('/upload', authenticate, upload.single('document'), async (req, res) => {
  try {
    const { type, applicationId, expiryDate } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const document = await req.prisma.document.create({
      data: {
        type,
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimeType: req.file.mimetype,
        uploadedBy: req.user.id,
        applicationId: applicationId || null,
        expiryDate: expiryDate ? new Date(expiryDate) : null
      }
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: document.id,
        type: document.type,
        filename: document.filename,
        originalName: document.originalName,
        uploadedAt: document.createdAt
      }
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get documents for an application
router.get('/application/:applicationId', authenticate, async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const documents = await req.prisma.document.findMany({
      where: { applicationId },
      select: {
        id: true,
        type: true,
        filename: true,
        originalName: true,
        size: true,
        expiryDate: true,
        createdAt: true,
        uploadedBy: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
});

// Download document
router.get('/download/:documentId', authenticate, async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const document = await req.prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const filePath = document.path;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    res.download(filePath, document.originalName);
  } catch (error) {
    console.error('Document download error:', error);
    res.status(500).json({ error: 'Failed to download document' });
  }
});

// Delete document
router.delete('/:documentId', authenticate, async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const document = await req.prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if user has permission to delete
    if (document.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to delete this document' });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    // Delete from database
    await req.prisma.document.delete({
      where: { id: documentId }
    });

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Document delete error:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;