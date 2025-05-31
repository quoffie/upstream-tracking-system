const nodemailer = require('nodemailer');
const twilio = require('twilio');

/**
 * Notification Service
 * Handles sending notifications via in-app, email, and SMS
 */
class NotificationService {
  constructor() {
    // Initialize email transporter
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined
    });

    // Initialize SMS client if credentials are provided
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.smsClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    }
  }

  /**
   * Send in-app notification
   * @param {object} prisma - Prisma client
   * @param {string} userId - User ID to send notification to
   * @param {string} sentById - User ID sending the notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @returns {Promise<object>} Created notification
   */
  async sendInAppNotification(prisma, userId, sentById, title, message) {
    try {
      const notification = await prisma.notification.create({
        data: {
          title,
          message,
          type: 'IN_APP',
          user: { connect: { id: userId } },
          sentBy: { connect: { id: sentById } }
        }
      });

      return notification;
    } catch (error) {
      console.error('Error sending in-app notification:', error);
      throw error;
    }
  }

  /**
   * Send email notification
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {string} html - Email HTML content
   * @returns {Promise<object>} Email send info
   */
  async sendEmailNotification(to, subject, html) {
    try {
      const info = await this.emailTransporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html
      });

      return info;
    } catch (error) {
      console.error('Error sending email notification:', error);
      throw error;
    }
  }

  /**
   * Send SMS notification
   * @param {string} to - Recipient phone number
   * @param {string} message - SMS message
   * @returns {Promise<object>} SMS send info
   */
  async sendSmsNotification(to, message) {
    try {
      if (!this.smsClient) {
        throw new Error('SMS client not initialized. Check Twilio credentials.');
      }

      const info = await this.smsClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to
      });

      return info;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      throw error;
    }
  }

  /**
   * Send notification via multiple channels
   * @param {object} prisma - Prisma client
   * @param {object} options - Notification options
   * @returns {Promise<object>} Notification results
   */
  async sendMultiChannelNotification(prisma, options) {
    const {
      userId,
      sentById,
      title,
      message,
      email,
      emailSubject,
      emailHtml,
      phone,
      smsMessage,
      channels = ['IN_APP']
    } = options;

    const results = {};

    try {
      // Send in-app notification
      if (channels.includes('IN_APP') && userId && sentById) {
        results.inApp = await this.sendInAppNotification(
          prisma,
          userId,
          sentById,
          title,
          message
        );
      }

      // Send email notification
      if (channels.includes('EMAIL') && email) {
        results.email = await this.sendEmailNotification(
          email,
          emailSubject || title,
          emailHtml || `<p>${message}</p>`
        );
      }

      // Send SMS notification
      if (channels.includes('SMS') && phone) {
        results.sms = await this.sendSmsNotification(
          phone,
          smsMessage || message
        );
      }

      return results;
    } catch (error) {
      console.error('Error sending multi-channel notification:', error);
      throw error;
    }
  }

  /**
   * Create email template for permit status change
   * @param {object} permit - Permit data
   * @param {string} status - New status
   * @returns {string} HTML email template
   */
  createPermitStatusEmailTemplate(permit, status) {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #003366; color: white; padding: 10px 20px; }
    .content { padding: 20px; border: 1px solid #ddd; }
    .footer { font-size: 12px; color: #777; margin-top: 20px; }
    .highlight { color: #003366; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Petroleum Commission Ghana</h2>
    </div>
    <div class="content">
      <h3>Permit Application Status Update</h3>
      <p>Dear Applicant,</p>
      <p>Your permit application with reference number <span class="highlight">${permit.permitNumber}</span> has been updated.</p>
      <p>Current Status: <span class="highlight">${status}</span></p>
      <p>Project: ${permit.projectName || 'N/A'}</p>
      <p>Please log in to your account on the Upstream Tracking System to view more details.</p>
      <p>If you have any questions, please contact our support team.</p>
      <p>Thank you,<br>Petroleum Commission Ghana</p>
    </div>
    <div class="footer">
      <p>This is an automated message. Please do not reply to this email.</p>
      <p>&copy; ${new Date().getFullYear()} Petroleum Commission Ghana. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
  }
}

module.exports = new NotificationService();