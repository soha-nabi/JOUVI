const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const templates = {
  emailVerification: {
    subject: 'Welcome to Jouvi - Verify Your Email',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to Jouvi!</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Hi ${data.name},</h2>
          <p>Thank you for joining Jouvi! We're excited to help you on your career journey.</p>
          <p>Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${data.verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Jouvi Team</p>
        </div>
      </div>
    `
  },
  passwordReset: {
    subject: 'Password Reset Request - Jouvi',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Password Reset</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Hi ${data.name},</h2>
          <p>You requested a password reset for your Jouvi account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${data.resetUrl}</p>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The Jouvi Team</p>
        </div>
      </div>
    `
  },
  bookingConfirmation: {
    subject: 'Booking Confirmed - Jouvi Mentoring Session',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Hi ${data.menteeName},</h2>
          <p>Your mentoring session has been confirmed!</p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Session Details:</h3>
            <p><strong>Mentor:</strong> ${data.mentorName}</p>
            <p><strong>Session Type:</strong> ${data.sessionType}</p>
            <p><strong>Date & Time:</strong> ${data.dateTime}</p>
            <p><strong>Duration:</strong> ${data.duration} minutes</p>
            <p><strong>Amount Paid:</strong> $${data.amount}</p>
          </div>
          <p>You'll receive a calendar invite and meeting link 24 hours before your session.</p>
          <p>Best regards,<br>The Jouvi Team</p>
        </div>
      </div>
    `
  }
};

const sendEmail = async (options) => {
  const transporter = createTransporter();

  let html = '';
  let subject = options.subject;

  if (options.template && templates[options.template]) {
    const template = templates[options.template];
    html = template.html(options.data);
    subject = template.subject;
  } else {
    html = options.html || options.message;
  }

  const message = {
    from: `Jouvi <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: subject,
    html: html
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
  
  return info;
};

module.exports = sendEmail;