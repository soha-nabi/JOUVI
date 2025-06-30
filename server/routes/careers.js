const express = require('express');
const { body } = require('express-validator');
const Career = require('../models/Career');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { difficulty, search, skills } = req.query;
  
  let query = { isActive: true };

  // Filter by difficulty
  if (difficulty) {
    query.difficulty = difficulty;
  }

  // Search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { skills: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Filter by skills
  if (skills) {
    const skillsArray = skills.split(',');
    query.skills = { $in: skillsArray };
  }

  const careers = await Career.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: careers.length,
    data: careers
  });
}));

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const career = await Career.findOne({ 
    $or: [{ _id: req.params.id }, { id: req.params.id }],
    isActive: true 
  });

  if (!career) {
    return res.status(404).json({
      success: false,
      error: 'Career not found'
    });
  }

  res.status(200).json({
    success: true,
    data: career
  });
}));

// @desc    Create career
// @route   POST /api/careers
// @access  Private/Admin
router.post('/', [
  protect,
  authorize('admin'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']),
  validate
], asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  
  const career = await Career.create(req.body);

  res.status(201).json({
    success: true,
    data: career
  });
}));

// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  authorize('admin'),
  validate
], asyncHandler(async (req, res) => {
  const career = await Career.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!career) {
    return res.status(404).json({
      success: false,
      error: 'Career not found'
    });
  }

  res.status(200).json({
    success: true,
    data: career
  });
}));

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    return res.status(404).json({
      success: false,
      error: 'Career not found'
    });
  }

  await career.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Career deleted successfully'
  });
}));

module.exports = router;