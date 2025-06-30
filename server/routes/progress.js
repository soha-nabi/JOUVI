const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const Career = require('../models/Career');
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('progress.currentCareer')
    .select('progress');

  res.status(200).json({
    success: true,
    data: user.progress
  });
}));

// @desc    Update user progress
// @route   PUT /api/progress
// @access  Private
router.put('/', [
  protect,
  body('currentCareer').optional().isMongoId(),
  body('completedItems').optional().isArray(),
  body('currentXP').optional().isNumeric(),
  body('level').optional().isNumeric(),
  validate
], asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Update progress fields
  Object.keys(req.body).forEach(key => {
    if (user.progress[key] !== undefined) {
      user.progress[key] = req.body[key];
    }
  });

  // Update last activity
  user.progress.lastActivity = new Date();

  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .populate('progress.currentCareer')
    .select('progress');

  res.status(200).json({
    success: true,
    data: updatedUser.progress
  });
}));

// @desc    Complete roadmap item
// @route   POST /api/progress/complete-item
// @access  Private
router.post('/complete-item', [
  protect,
  body('itemId').notEmpty().withMessage('Item ID is required'),
  body('xpGained').optional().isNumeric(),
  validate
], asyncHandler(async (req, res) => {
  const { itemId, xpGained = 0 } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Check if item is already completed
  if (user.progress.completedItems.includes(itemId)) {
    return res.status(400).json({
      success: false,
      error: 'Item already completed'
    });
  }

  // Add item to completed items
  user.progress.completedItems.push(itemId);
  
  // Update XP and level
  user.progress.currentXP += xpGained;
  const newLevel = Math.floor(user.progress.currentXP / 250) + 1;
  
  if (newLevel > user.progress.level) {
    user.progress.level = newLevel;
    // Could add achievement here
  }

  // Update streak
  const today = new Date();
  const lastActivity = user.progress.lastActivity;
  
  if (lastActivity) {
    const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
    if (daysDiff === 1) {
      user.progress.streakDays += 1;
    } else if (daysDiff > 1) {
      user.progress.streakDays = 1;
    }
  } else {
    user.progress.streakDays = 1;
  }

  user.progress.lastActivity = today;
  await user.save();

  res.status(200).json({
    success: true,
    data: user.progress,
    message: `Item completed! +${xpGained} XP`
  });
}));

// @desc    Set current career
// @route   POST /api/progress/set-career
// @access  Private
router.post('/set-career', [
  protect,
  body('careerId').notEmpty().withMessage('Career ID is required'),
  validate
], asyncHandler(async (req, res) => {
  const { careerId } = req.body;
  
  // Verify career exists
  const career = await Career.findOne({ 
    $or: [{ _id: careerId }, { id: careerId }],
    isActive: true 
  });

  if (!career) {
    return res.status(404).json({
      success: false,
      error: 'Career not found'
    });
  }

  const user = await User.findById(req.user.id);
  user.progress.currentCareer = career._id;
  user.progress.lastActivity = new Date();
  
  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .populate('progress.currentCareer')
    .select('progress');

  res.status(200).json({
    success: true,
    data: updatedUser.progress,
    message: 'Career path set successfully'
  });
}));

// @desc    Get leaderboard
// @route   GET /api/progress/leaderboard
// @access  Private
router.get('/leaderboard', protect, asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const leaderboard = await User.find({ isActive: true })
    .select('name avatar progress.currentXP progress.level progress.streakDays')
    .sort({ 'progress.currentXP': -1 })
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    data: leaderboard
  });
}));

module.exports = router;