const express = require('express');
const { body } = require('express-validator');
const Booking = require('../models/Booking');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  let query = {};

  // Filter by user role
  if (req.user.role === 'user') {
    query.menteeId = req.user.id;
  } else if (req.user.role === 'mentor') {
    const mentor = await Mentor.findOne({ userId: req.user.id });
    if (mentor) {
      query.mentorId = mentor._id;
    }
  }
  // Admin can see all bookings

  const { status, page = 1, limit = 10 } = req.query;

  if (status) {
    query.status = status;
  }

  const startIndex = (page - 1) * limit;
  const total = await Booking.countDocuments(query);

  const bookings = await Booking.find(query)
    .populate('mentorId', 'title company hourlyRate')
    .populate('menteeId', 'name email')
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: bookings.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: bookings
  });
}));

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('mentorId', 'title company hourlyRate userId')
    .populate('menteeId', 'name email');

  if (!booking) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found'
    });
  }

  // Check authorization
  const isOwner = booking.menteeId._id.toString() === req.user.id;
  const isMentor = booking.mentorId.userId.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isMentor && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to access this booking'
    });
  }

  res.status(200).json({
    success: true,
    data: booking
  });
}));

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
router.post('/', [
  protect,
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('sessionTypeId').notEmpty().withMessage('Session type is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('menteeInfo.name').notEmpty().withMessage('Name is required'),
  body('menteeInfo.email').isEmail().withMessage('Valid email is required'),
  body('menteeInfo.goals').notEmpty().withMessage('Goals are required'),
  body('paymentInfo.method').isIn(['card', 'paypal']).withMessage('Invalid payment method'),
  body('paymentInfo.amount').isNumeric().withMessage('Amount must be a number'),
  validate
], asyncHandler(async (req, res) => {
  const { mentorId, sessionTypeId, timeSlot, menteeInfo, paymentInfo } = req.body;

  // Verify mentor exists and is available
  const mentor = await Mentor.findById(mentorId);
  if (!mentor || !mentor.isActive) {
    return res.status(404).json({
      success: false,
      error: 'Mentor not found or not available'
    });
  }

  // Find the session type
  const sessionType = mentor.sessionTypes.id(sessionTypeId);
  if (!sessionType) {
    return res.status(404).json({
      success: false,
      error: 'Session type not found'
    });
  }

  // Check if time slot is available
  const availableSlot = mentor.availableSlots.find(
    slot => slot.id === timeSlot.id && slot.available
  );

  if (!availableSlot) {
    return res.status(400).json({
      success: false,
      error: 'Time slot is not available'
    });
  }

  // Create booking
  const booking = await Booking.create({
    mentorId,
    menteeId: req.user.id,
    sessionTypeId,
    sessionType: {
      name: sessionType.name,
      description: sessionType.description,
      duration: sessionType.duration,
      price: sessionType.price
    },
    timeSlot,
    menteeInfo,
    paymentInfo,
    status: 'confirmed' // In real app, this would be 'pending' until payment is processed
  });

  // Mark time slot as unavailable
  availableSlot.available = false;
  availableSlot.bookingId = booking._id;
  await mentor.save();

  // Send confirmation emails
  try {
    // Email to mentee
    await sendEmail({
      email: menteeInfo.email,
      template: 'bookingConfirmation',
      data: {
        menteeName: menteeInfo.name,
        mentorName: mentor.title,
        sessionType: sessionType.name,
        dateTime: `${timeSlot.date} at ${timeSlot.time}`,
        duration: sessionType.duration,
        amount: paymentInfo.amount
      }
    });

    // Email to mentor (you would get mentor's email from User model)
    const mentorUser = await User.findById(mentor.userId);
    if (mentorUser) {
      await sendEmail({
        email: mentorUser.email,
        subject: 'New Booking Received - Jouvi',
        template: 'newBookingMentor',
        data: {
          mentorName: mentor.title,
          menteeName: menteeInfo.name,
          sessionType: sessionType.name,
          dateTime: `${timeSlot.date} at ${timeSlot.time}`,
          duration: sessionType.duration,
          goals: menteeInfo.goals
        }
      });
    }
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.status(201).json({
    success: true,
    data: booking
  });
}));

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
router.put('/:id/status', [
  protect,
  body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled', 'refunded']),
  validate
], asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found'
    });
  }

  // Check authorization (mentor or admin can update status)
  const mentor = await Mentor.findById(booking.mentorId);
  const isMentor = mentor && mentor.userId.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isMentor && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update booking status'
    });
  }

  booking.status = req.body.status;
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
}));

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
router.put('/:id/cancel', [
  protect,
  body('reason').optional().isString(),
  validate
], asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found'
    });
  }

  // Check if booking can be cancelled
  if (!booking.canBeCancelled()) {
    return res.status(400).json({
      success: false,
      error: 'Booking cannot be cancelled (less than 24 hours before session)'
    });
  }

  // Check authorization
  const isOwner = booking.menteeId.toString() === req.user.id;
  const mentor = await Mentor.findById(booking.mentorId);
  const isMentor = mentor && mentor.userId.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isMentor && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to cancel this booking'
    });
  }

  // Calculate refund amount
  const refundAmount = booking.calculateRefund();

  // Update booking
  booking.status = 'cancelled';
  booking.cancellation = {
    cancelledBy: req.user.role === 'mentor' ? 'mentor' : 'mentee',
    reason: req.body.reason,
    cancelledAt: new Date(),
    refundAmount,
    refundProcessed: false
  };

  await booking.save();

  // Free up the time slot
  if (mentor) {
    const timeSlot = mentor.availableSlots.find(
      slot => slot.id === booking.timeSlot.id
    );
    if (timeSlot) {
      timeSlot.available = true;
      timeSlot.bookingId = undefined;
      await mentor.save();
    }
  }

  res.status(200).json({
    success: true,
    data: booking,
    message: `Booking cancelled. Refund amount: $${refundAmount}`
  });
}));

module.exports = router;