const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Mock career data for analysis
const careerDatabase = {
  'Full Stack Developer': {
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    salaryRange: '$70,000 - $120,000',
    growthPotential: 'High - 22% growth expected',
    description: 'Build end-to-end web applications using modern technologies',
    roadmap: [
      'Master TypeScript and advanced React patterns',
      'Learn cloud deployment with AWS/Azure',
      'Build 3-5 full-stack projects',
      'Contribute to open source projects',
      'Apply for junior developer positions'
    ]
  },
  'Data Scientist': {
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    salaryRange: '$85,000 - $140,000',
    growthPotential: 'Very High - 31% growth expected',
    description: 'Extract insights from data to drive business decisions',
    roadmap: [
      'Strengthen statistics and mathematics foundation',
      'Learn R and advanced ML algorithms',
      'Complete data science projects with real datasets',
      'Build a portfolio showcasing data insights',
      'Network with data science professionals'
    ]
  },
  'Product Manager': {
    requiredSkills: ['Strategy', 'Analytics', 'Communication', 'Leadership'],
    salaryRange: '$90,000 - $150,000',
    growthPotential: 'High - 19% growth expected',
    description: 'Guide product development from conception to launch',
    roadmap: [
      'Develop product management fundamentals',
      'Learn agile methodologies and tools',
      'Practice with product case studies',
      'Build cross-functional collaboration skills',
      'Seek product management internships'
    ]
  },
  'UX Designer': {
    requiredSkills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping'],
    salaryRange: '$65,000 - $110,000',
    growthPotential: 'High - 13% growth expected',
    description: 'Design intuitive and beautiful user experiences',
    roadmap: [
      'Master design principles and tools',
      'Conduct user research and testing',
      'Build a strong design portfolio',
      'Learn interaction design patterns',
      'Apply for UX design roles'
    ]
  },
  'DevOps Engineer': {
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    salaryRange: '$80,000 - $130,000',
    growthPotential: 'Very High - 25% growth expected',
    description: 'Automate and optimize software development and deployment',
    roadmap: [
      'Learn cloud platforms and containerization',
      'Master infrastructure as code',
      'Implement CI/CD pipelines',
      'Study monitoring and logging tools',
      'Get cloud certifications'
    ]
  },
  'Cybersecurity Analyst': {
    requiredSkills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Compliance'],
    salaryRange: '$75,000 - $125,000',
    growthPotential: 'Very High - 33% growth expected',
    description: 'Protect organizations from cyber threats and vulnerabilities',
    roadmap: [
      'Learn cybersecurity fundamentals',
      'Get security certifications (CISSP, CEH)',
      'Practice with security tools and frameworks',
      'Understand compliance requirements',
      'Gain hands-on experience with incident response'
    ]
  }
};

// @desc    Analyze career path based on user profile
// @route   POST /api/analyzer/analyze
// @access  Public
router.post('/analyze', [
  optionalAuth,
  body('technicalSkills').isArray().withMessage('Technical skills must be an array'),
  body('interests').isArray().withMessage('Interests must be an array'),
  body('academicPerformance').isObject().withMessage('Academic performance must be an object'),
  validate
], asyncHandler(async (req, res) => {
  const {
    technicalSkills,
    academicPerformance,
    interests,
    workExperience
  } = req.body;

  // Calculate match scores for each career
  const recommendations = [];

  Object.entries(careerDatabase).forEach(([careerName, careerData]) => {
    let matchScore = 0;

    // Technical skills matching (40% weight)
    const skillMatches = careerData.requiredSkills.filter(skill => 
      technicalSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    const skillScore = (skillMatches.length / careerData.requiredSkills.length) * 40;
    matchScore += skillScore;

    // Interest alignment (30% weight)
    const interestScore = calculateInterestScore(careerName, interests) * 30;
    matchScore += interestScore;

    // Academic performance (20% weight)
    const academicScore = calculateAcademicScore(academicPerformance) * 20;
    matchScore += academicScore;

    // Work experience (10% weight)
    const experienceScore = calculateExperienceScore(workExperience, careerName) * 10;
    matchScore += experienceScore;

    // Calculate missing skills
    const missingSkills = careerData.requiredSkills.filter(skill => 
      !technicalSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );

    recommendations.push({
      role: careerName,
      matchPercentage: Math.round(matchScore),
      description: careerData.description,
      requiredSkills: skillMatches,
      missingSkills,
      salaryRange: careerData.salaryRange,
      growthPotential: careerData.growthPotential,
      roadmap: careerData.roadmap
    });
  });

  // Sort by match percentage and take top 3
  recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const topRecommendations = recommendations.slice(0, 3);

  res.status(200).json({
    success: true,
    data: {
      recommendations: topRecommendations,
      userProfile: {
        technicalSkills,
        academicPerformance,
        interests,
        workExperience
      },
      analysisDate: new Date().toISOString()
    }
  });
}));

// Helper function to calculate interest score
function calculateInterestScore(careerName, interests) {
  const careerInterestMap = {
    'Full Stack Developer': ['Problem Solving', 'Technology', 'Innovation'],
    'Data Scientist': ['Data Analysis', 'Research', 'Problem Solving'],
    'Product Manager': ['Strategy', 'Team Leadership', 'Innovation'],
    'UX Designer': ['Creative Design', 'Problem Solving', 'Innovation'],
    'DevOps Engineer': ['Technology', 'Problem Solving', 'Innovation'],
    'Cybersecurity Analyst': ['Problem Solving', 'Technology', 'Strategy']
  };

  const careerInterests = careerInterestMap[careerName] || [];
  const matches = interests.filter(interest => careerInterests.includes(interest));
  
  return careerInterests.length > 0 ? matches.length / careerInterests.length : 0;
}

// Helper function to calculate academic score
function calculateAcademicScore(academicPerformance) {
  const { gpa, degree, major } = academicPerformance;
  
  let score = 0.5; // Base score
  
  // GPA consideration
  if (gpa) {
    const gpaValue = parseFloat(gpa);
    if (gpaValue >= 3.5) score += 0.3;
    else if (gpaValue >= 3.0) score += 0.2;
    else if (gpaValue >= 2.5) score += 0.1;
  }
  
  // Degree level
  if (degree === 'masters' || degree === 'phd') score += 0.2;
  else if (degree === 'bachelors') score += 0.1;
  
  return Math.min(score, 1);
}

// Helper function to calculate experience score
function calculateExperienceScore(workExperience, careerName) {
  const experienceMap = {
    'none': 0.3,
    '0-2': 0.5,
    '2-5': 0.8,
    '5+': 1.0
  };
  
  return experienceMap[workExperience] || 0.3;
}

// @desc    Get career information
// @route   GET /api/analyzer/careers
// @access  Public
router.get('/careers', optionalAuth, asyncHandler(async (req, res) => {
  const careers = Object.entries(careerDatabase).map(([name, data]) => ({
    name,
    description: data.description,
    requiredSkills: data.requiredSkills,
    salaryRange: data.salaryRange,
    growthPotential: data.growthPotential
  }));

  res.status(200).json({
    success: true,
    data: careers
  });
}));

// @desc    Get detailed career information
// @route   GET /api/analyzer/careers/:career
// @access  Public
router.get('/careers/:career', optionalAuth, asyncHandler(async (req, res) => {
  const careerName = req.params.career.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const careerData = careerDatabase[careerName];

  if (!careerData) {
    return res.status(404).json({
      success: false,
      error: 'Career information not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      name: careerName,
      ...careerData
    }
  });
}));

module.exports = router;