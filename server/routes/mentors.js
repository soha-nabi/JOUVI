const express = require('express');
const { body } = require('express-validator');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Public
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { 
    expertise, 
    availability, 
    minRate, 
    maxRate, 
    search, 
    sortBy = 'rating',
    page = 1,
    limit = 10 
  } = req.query;

  let query = { isActive: true, isVerified: true };

  // Filter by expertise
  if (expertise && expertise !== 'all') {
    query.expertise = { $in: [expertise] };
  }

  // Filter by availability
  if (availability && availability !== 'all') {
    query.availability = availability;
  }

  // Filter by hourly rate
  if (minRate || maxRate) {
    query.hourlyRate = {};
    if (minRate) query.hourlyRate.$gte = parseInt(minRate);
    if (maxRate) query.hourlyRate.$lte = parseInt(maxRate);
  }

  // Search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { expertise: { $in: [new RegExp(search, 'i')] } },
      { bio: { $regex: search, $options: 'i' } }
    ];
  }

  // Sorting
  let sortOptions = {};
  switch (sortBy) {
    case 'rating':
      sortOptions = { rating: -1 };
      break;
    case 'price-low':
      sortOptions = { hourlyRate: 1 };
      break;
    case 'price-high':
      sortOptions = { hourlyRate: -1 };
      break;
    case 'experience':
      sortOptions = { totalSessions: -1 };
      break;
    case 'reviews':
      sortOptions = { reviewCount: -1 };
      break;
    default:
      sortOptions = { rating: -1 };
  }

  const startIndex = (page - 1) * limit;
  const total = await Mentor.countDocuments(query);

  const mentors = await Mentor.find(query)
    .populate('userId', 'name email avatar')
    .sort(sortOptions)
    .skip(startIndex)
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: mentors.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: mentors
  });
}));

// @desc    Get single mentor
// @route   GET /api/mentors/:id
// @access  Public
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id)
    .populate('userId', 'name email avatar');

  if (!mentor || !mentor.isActive) {
    return res.status(404).json({
      success: false,
      error: 'Mentor not found'
    });
  }

  res.status(200).json({
    success: true,
    data: mentor
  });
}));

// @desc    Create mentor profile
// @route   POST /api/mentors
// @access  Private
router.post('/', [
  protect,
  body('title').notEmpty().withMessage('Professional title is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('bio').isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters'),
  body('fullBio').isLength({ max: 1000 }).withMessage('Full bio cannot exceed 1000 characters'),
  body('expertise').isArray({ min: 1, max: 10 }).withMessage('Please provide 1-10 areas of expertise'),
  body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
  body('timezone').notEmpty().withMessage('Timezone is required'),
  validate
], asyncHandler(async (req, res) => {
  // Check if user already has a mentor profile
  const existingMentor = await Mentor.findOne({ userId: req.user.id });
  if (existingMentor) {
    return res.status(400).json({
      success: false,
      error: 'Mentor profile already exists'
    });
  }

  req.body.userId = req.user.id;
  
  const mentor = await Mentor.create(req.body);

  res.status(201).json({
    success: true,
    data: mentor
  });
}));

// @desc    Update mentor profile
// @route   PUT /api/mentors/:id
// @access  Private
router.put('/:id', [
  protect,
  validate
], asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    return res.status(404).json({
      success: false,
      error: 'Mentor not found'
    });
  }

  // Check ownership
  if (mentor.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this profile'
    });
  }

  const updatedMentor = await Mentor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedMentor
  });
}));

// @desc    Add review to mentor
// @route   POST /api/mentors/:id/reviews
// @access  Private
router.post('/:id/reviews', [
  protect,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
  body('sessionType').notEmpty().withMessage('Session type is required'),
  validate
], asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    return res.status(404).json({
      success: false,
      error: 'Mentor not found'
    });
  }

  // Check if user already reviewed this mentor
  const existingReview = mentor.reviews.find(
    review => review.menteeId.toString() === req.user.id
  );

  if (existingReview) {
    return res.status(400).json({
      success: false,
      error: 'You have already reviewed this mentor'
    });
  }

  const review = {
    menteeId: req.user.id,
    menteeName: req.user.name,
    menteeAvatar: req.user.avatar,
    rating: req.body.rating,
    comment: req.body.comment,
    sessionType: req.body.sessionType,
    verified: true
  };

  mentor.reviews.push(review);
  await mentor.save();

  res.status(201).json({
    success: true,
    data: review
  });
}));

// @desc    Update mentor availability
// @route   PUT /api/mentors/:id/availability
// @access  Private
router.put('/:id/availability', [
  protect,
  body('availability').isIn(['Available', 'Busy', 'Offline']),
  validate
], asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    return res.status(404).json({
      success: false,
      error: 'Mentor not found'
    });
  }

  // Check ownership
  if (mentor.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this profile'
    });
  }

  mentor.availability = req.body.availability;
  mentor.lastActive = new Date();
  await mentor.save();

  res.status(200).json({
    success: true,
    data: mentor
  });
}));

module.exports = router;