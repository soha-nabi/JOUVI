const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');
const { optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Mock data for countries and universities
const countryData = {
  'United States': {
    flag: '🇺🇸',
    visaRequirements: [
      'F-1 Student Visa required',
      'SEVIS fee: $350',
      'Financial proof: $50,000+ annually',
      'English proficiency: TOEFL/IELTS'
    ],
    averageCost: '$40,000 - $70,000/year',
    topUniversities: ['MIT', 'Stanford', 'Harvard', 'Carnegie Mellon', 'UC Berkeley'],
    careerOpportunities: [
      'Tech industry leadership',
      'Research positions',
      'Startup ecosystem access',
      'High salary potential'
    ]
  },
  'Canada': {
    flag: '🇨🇦',
    visaRequirements: [
      'Study Permit required',
      'Biometrics: $85',
      'Financial proof: $20,000+ annually',
      'Medical exam may be required'
    ],
    averageCost: '$25,000 - $45,000/year',
    topUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo', 'McMaster'],
    careerOpportunities: [
      'Tech hub opportunities',
      'Government research roles',
      'Immigration-friendly policies',
      'Work permit after graduation'
    ]
  },
  'Germany': {
    flag: '🇩🇪',
    visaRequirements: [
      'Student Visa required',
      'Blocked account: €11,208',
      'Health insurance mandatory',
      'German language proficiency helpful'
    ],
    averageCost: '€500 - €3,000/year tuition',
    topUniversities: ['TUM', 'RWTH Aachen', 'KIT', 'TU Berlin', 'University of Munich'],
    careerOpportunities: [
      'Engineering excellence',
      'Automotive industry',
      'Research institutions',
      'EU market access'
    ]
  },
  'United Kingdom': {
    flag: '🇬🇧',
    visaRequirements: [
      'Student Visa required',
      'Financial proof: £1,334/month',
      'English proficiency: IELTS',
      'Tuberculosis test may be required'
    ],
    averageCost: '£15,000 - £35,000/year',
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'Edinburgh'],
    careerOpportunities: [
      'Financial services',
      'Tech innovation',
      'Research opportunities',
      'European market access'
    ]
  },
  'Australia': {
    flag: '🇦🇺',
    visaRequirements: [
      'Student Visa (subclass 500)',
      'Overseas Student Health Cover',
      'Financial proof: AUD $21,041/year',
      'English proficiency: IELTS/TOEFL'
    ],
    averageCost: 'AUD $25,000 - $45,000/year',
    topUniversities: ['Melbourne', 'Sydney', 'ANU', 'UNSW', 'Monash'],
    careerOpportunities: [
      'Mining and resources',
      'Tech and innovation',
      'Research opportunities',
      'Work rights after graduation'
    ]
  }
};

// @desc    Get masters program recommendations
// @route   POST /api/advisory/recommendations
// @access  Public
router.post('/recommendations', [
  optionalAuth,
  body('academicBackground').notEmpty().withMessage('Academic background is required'),
  body('currentDegree').notEmpty().withMessage('Current degree is required'),
  body('studyGoals').isArray({ min: 1 }).withMessage('At least one study goal is required'),
  body('programInterests').isArray({ min: 1 }).withMessage('At least one program interest is required'),
  validate
], asyncHandler(async (req, res) => {
  const {
    academicBackground,
    currentDegree,
    gpa,
    studyGoals,
    preferredCountries,
    budgetRange,
    programInterests,
    workExperience
  } = req.body;

  // Calculate scores for each country based on user preferences
  const recommendations = [];

  // Define scoring logic
  const calculateCountryScore = (country) => {
    let score = 70; // Base score

    // Preferred countries boost
    if (preferredCountries.includes(country)) {
      score += 15;
    }

    // Budget considerations
    const countryInfo = countryData[country];
    if (budgetRange === 'under-20k' && country === 'Germany') {
      score += 10;
    } else if (budgetRange === '20k-40k' && (country === 'Canada' || country === 'Germany')) {
      score += 8;
    } else if (budgetRange === '40k-60k' && (country === 'United Kingdom' || country === 'Australia')) {
      score += 5;
    }

    // Program interests
    if (programInterests.includes('Computer Science') && 
        ['United States', 'Canada', 'Germany'].includes(country)) {
      score += 8;
    }
    if (programInterests.includes('Business Administration') && 
        ['United States', 'United Kingdom'].includes(country)) {
      score += 8;
    }

    // Study goals
    if (studyGoals.includes('Research & PhD Preparation') && 
        ['United States', 'Germany', 'United Kingdom'].includes(country)) {
      score += 10;
    }
    if (studyGoals.includes('Industry Career Advancement') && 
        ['United States', 'Canada', 'Australia'].includes(country)) {
      score += 8;
    }

    // Academic performance boost
    if (gpa && parseFloat(gpa) >= 3.5) {
      score += 5;
    }

    // Work experience considerations
    if (workExperience === '2-5' || workExperience === '5+') {
      if (['United States', 'Canada'].includes(country)) {
        score += 5;
      }
    }

    return Math.min(score, 100); // Cap at 100
  };

  // Generate recommendations for preferred countries or top countries
  const countriesToEvaluate = preferredCountries.length > 0 
    ? preferredCountries 
    : Object.keys(countryData);

  countriesToEvaluate.forEach(country => {
    if (countryData[country]) {
      const score = calculateCountryScore(country);
      const countryInfo = countryData[country];

      // Generate reasons based on score factors
      const reasons = [];
      if (preferredCountries.includes(country)) {
        reasons.push('Matches your preferred destination');
      }
      if (programInterests.includes('Computer Science') && 
          ['United States', 'Canada', 'Germany'].includes(country)) {
        reasons.push('Strong programs in your field of interest');
      }
      if (studyGoals.includes('Research & PhD Preparation') && 
          ['United States', 'Germany', 'United Kingdom'].includes(country)) {
        reasons.push('Excellent research opportunities');
      }
      if (country === 'Germany' && budgetRange === 'under-20k') {
        reasons.push('Low tuition costs fit your budget');
      }
      if (['Canada', 'Australia'].includes(country)) {
        reasons.push('Post-graduation work opportunities');
      }
      if (reasons.length === 0) {
        reasons.push('Good overall fit for your profile');
      }

      recommendations.push({
        country,
        flag: countryInfo.flag,
        score,
        reasons,
        visaRequirements: countryInfo.visaRequirements,
        averageCost: countryInfo.averageCost,
        topUniversities: countryInfo.topUniversities,
        careerOpportunities: countryInfo.careerOpportunities
      });
    }
  });

  // Sort by score and take top 3
  recommendations.sort((a, b) => b.score - a.score);
  const topRecommendations = recommendations.slice(0, 3);

  res.status(200).json({
    success: true,
    data: {
      recommendations: topRecommendations,
      userProfile: {
        academicBackground,
        currentDegree,
        gpa,
        studyGoals,
        programInterests,
        workExperience
      }
    }
  });
}));

// @desc    Get country information
// @route   GET /api/advisory/countries
// @access  Public
router.get('/countries', optionalAuth, asyncHandler(async (req, res) => {
  const countries = Object.keys(countryData).map(country => ({
    name: country,
    flag: countryData[country].flag,
    averageCost: countryData[country].averageCost,
    topUniversities: countryData[country].topUniversities.slice(0, 3) // Top 3 for overview
  }));

  res.status(200).json({
    success: true,
    data: countries
  });
}));

// @desc    Get detailed country information
// @route   GET /api/advisory/countries/:country
// @access  Public
router.get('/countries/:country', optionalAuth, asyncHandler(async (req, res) => {
  const country = req.params.country;
  const countryInfo = countryData[country];

  if (!countryInfo) {
    return res.status(404).json({
      success: false,
      error: 'Country information not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      country,
      ...countryInfo
    }
  });
}));

module.exports = router;