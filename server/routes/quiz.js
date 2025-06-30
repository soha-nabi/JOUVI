const express = require('express');
const { body } = require('express-validator');
const Career = require('../models/Career');
const asyncHandler = require('../middleware/asyncHandler');
const { optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Quiz questions data
const quizQuestions = [
  {
    id: 'q1',
    question: 'What type of problems do you enjoy solving most?',
    options: [
      {
        id: 'q1a',
        text: 'Creating beautiful, interactive experiences that users love',
        careerWeights: { 'frontend-developer': 3, 'ux-designer': 2, 'ml-engineer': 0 }
      },
      {
        id: 'q1b',
        text: 'Understanding user behavior and designing intuitive interfaces',
        careerWeights: { 'frontend-developer': 1, 'ux-designer': 3, 'ml-engineer': 0 }
      },
      {
        id: 'q1c',
        text: 'Analyzing data patterns and building intelligent systems',
        careerWeights: { 'frontend-developer': 0, 'ux-designer': 0, 'ml-engineer': 3 }
      },
      {
        id: 'q1d',
        text: 'Building functional solutions that solve real problems',
        careerWeights: { 'frontend-developer': 2, 'ux-designer': 1, 'ml-engineer': 2 }
      }
    ]
  },
  {
    id: 'q2',
    question: 'Which tools or technologies excite you the most?',
    options: [
      {
        id: 'q2a',
        text: 'HTML, CSS, JavaScript, and modern frameworks like React',
        careerWeights: { 'frontend-developer': 3, 'ux-designer': 0, 'ml-engineer': 0 }
      },
      {
        id: 'q2b',
        text: 'Figma, Sketch, and prototyping tools for design',
        careerWeights: { 'frontend-developer': 0, 'ux-designer': 3, 'ml-engineer': 0 }
      },
      {
        id: 'q2c',
        text: 'Python, TensorFlow, and data analysis libraries',
        careerWeights: { 'frontend-developer': 0, 'ux-designer': 0, 'ml-engineer': 3 }
      },
      {
        id: 'q2d',
        text: 'I enjoy learning new tools as needed',
        careerWeights: { 'frontend-developer': 1, 'ux-designer': 1, 'ml-engineer': 1 }
      }
    ]
  },
  {
    id: 'q3',
    question: 'How do you prefer to spend your time?',
    options: [
      {
        id: 'q3a',
        text: 'Coding and building interactive web applications',
        careerWeights: { 'frontend-developer': 3, 'ux-designer': 0, 'ml-engineer': 1 }
      },
      {
        id: 'q3b',
        text: 'Researching users and creating design mockups',
        careerWeights: { 'frontend-developer': 0, 'ux-designer': 3, 'ml-engineer': 0 }
      },
      {
        id: 'q3c',
        text: 'Working with datasets and training AI models',
        careerWeights: { 'frontend-developer': 0, 'ux-designer': 0, 'ml-engineer': 3 }
      },
      {
        id: 'q3d',
        text: 'Collaborating with teams to solve complex problems',
        careerWeights: { 'frontend-developer': 1, 'ux-designer': 2, 'ml-engineer': 1 }
      }
    ]
  },
  {
    id: 'q4',
    question: 'What motivates you most in your career?',
    options: [
      {
        id: 'q4a',
        text: 'Seeing users interact with something I built',
        careerWeights: { 'frontend-developer': 3, 'ux-designer': 2, 'ml-engineer': 0 }
      },
      {
        id: 'q4b',
        text: 'Making complex things simple and beautiful',
        careerWeights: { 'frontend-developer': 1, 'ux-designer': 3, 'ml-engineer': 0 }
      },
      {
        id: 'q4c',
        text: 'Pushing the boundaries of what technology can do',
        careerWeights: { 'frontend-developer': 1, 'ux-designer': 0, 'ml-engineer': 3 }
      },
      {
        id: 'q4d',
        text: 'Continuous learning and growth',
        careerWeights: { 'frontend-developer': 2, 'ux-designer': 1, 'ml-engineer': 2 }
      }
    ]
  }
];

// @desc    Get quiz questions
// @route   GET /api/quiz/questions
// @access  Public
router.get('/questions', optionalAuth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: quizQuestions
  });
}));

// @desc    Submit quiz answers and get career recommendation
// @route   POST /api/quiz/submit
// @access  Public
router.post('/submit', [
  optionalAuth,
  body('answers').isObject().withMessage('Answers must be an object'),
  validate
], asyncHandler(async (req, res) => {
  const { answers } = req.body;

  // Calculate career scores
  const careerScores = {
    'frontend-developer': 0,
    'ux-designer': 0,
    'ml-engineer': 0
  };

  // Process each answer
  Object.values(answers).forEach(answerId => {
    quizQuestions.forEach(question => {
      const option = question.options.find(opt => opt.id === answerId);
      if (option) {
        Object.entries(option.careerWeights).forEach(([careerId, weight]) => {
          careerScores[careerId] += weight;
        });
      }
    });
  });

  // Find the career with the highest score
  const recommendedCareerId = Object.entries(careerScores).reduce((a, b) => 
    careerScores[a[0]] > careerScores[b[0]] ? a : b
  )[0];

  // Get the recommended career from database
  const recommendedCareer = await Career.findOne({ 
    id: recommendedCareerId,
    isActive: true 
  });

  if (!recommendedCareer) {
    return res.status(404).json({
      success: false,
      error: 'Recommended career not found'
    });
  }

  // Get alternative careers (other high-scoring options)
  const sortedCareers = Object.entries(careerScores)
    .sort(([,a], [,b]) => b - a)
    .slice(1, 3); // Get top 2 alternatives

  const alternativeCareers = await Career.find({
    id: { $in: sortedCareers.map(([id]) => id) },
    isActive: true
  });

  res.status(200).json({
    success: true,
    data: {
      recommendedCareer,
      alternativeCareers,
      scores: careerScores,
      totalQuestions: quizQuestions.length,
      answersProvided: Object.keys(answers).length
    }
  });
}));

module.exports = router;