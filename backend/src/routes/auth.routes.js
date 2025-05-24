const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');

/**
 * Authentication Routes
 * Handles user registration, login, password reset, and profile management
 */

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, companyId, phone } = req.body;

    // Check if user already exists
    const existingUser = await req.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await req.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone,
        companyId: companyId || null
      },
      include: {
        company: true
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send welcome notification
    await notificationService.sendMultiChannelNotification(req.prisma, {
      userId: user.id,
      sentById: user.id,
      title: 'Welcome to PC-OTS',
      message: `Welcome to the Petroleum Commission Offshore Tracking System, ${user.firstName}! Your account has been successfully created.`,
      email: user.email,
      emailSubject: 'Welcome to PC-OTS - Account Created',
      channels: ['IN_APP', 'EMAIL']
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        company: user.company
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await req.prisma.user.findUnique({
      where: { email },
      include: {
        company: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await req.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        company: user.company
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// Get Current User Profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        company: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        profilePicture: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        company: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User Profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, profilePicture } = req.body;
    const userId = req.user.userId;

    const updatedUser = await req.prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone,
        profilePicture
      },
      include: {
        company: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        profilePicture: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        company: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change Password
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Get current user
    const user = await req.prisma.user.findUnique({
      where: { id: userId }
    });

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await req.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    // Send notification
    await notificationService.sendMultiChannelNotification(req.prisma, {
      userId: user.id,
      sentById: user.id,
      title: 'Password Changed',
      message: 'Your password has been successfully changed.',
      email: user.email,
      emailSubject: 'PC-OTS - Password Changed',
      channels: ['IN_APP', 'EMAIL']
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Request Password Reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await req.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists or not
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }

    // Generate reset token (in production, use crypto.randomBytes)
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send reset email
    await notificationService.sendMultiChannelNotification(req.prisma, {
      userId: user.id,
      sentById: user.id,
      title: 'Password Reset Request',
      message: 'A password reset has been requested for your account.',
      email: user.email,
      emailSubject: 'PC-OTS - Password Reset Request',
      emailBody: `Click the following link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      channels: ['EMAIL']
    });

    res.json({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await req.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    // Send confirmation notification
    const user = await req.prisma.user.findUnique({
      where: { id: userId }
    });

    await notificationService.sendMultiChannelNotification(req.prisma, {
      userId: user.id,
      sentById: user.id,
      title: 'Password Reset Successful',
      message: 'Your password has been successfully reset.',
      email: user.email,
      emailSubject: 'PC-OTS - Password Reset Successful',
      channels: ['IN_APP', 'EMAIL']
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout (client-side token removal, but we can log the action)
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Log the logout action
    await req.prisma.auditLog.create({
      data: {
        action: 'LOGOUT',
        entityType: 'USER',
        entityId: req.user.userId,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;