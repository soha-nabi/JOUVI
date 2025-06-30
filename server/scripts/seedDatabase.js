const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Career = require('../models/Career');
const Mentor = require('../models/Mentor');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jouvi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'mentor',
    isEmailVerified: true
  },
  {
    name: 'Admin User',
    email: 'admin@jouvi.com',
    password: 'admin123',
    role: 'admin',
    isEmailVerified: true
  }
];

const careers = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build beautiful, interactive user interfaces and web experiences',
    icon: '💻',
    color: 'from-blue-400 to-purple-500',
    difficulty: 'Beginner',
    timeToMaster: '6-12 months',
    averageSalary: '$70,000 - $120,000',
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
    industries: ['Technology', 'E-commerce', 'Media', 'Finance'],
    jobTitles: ['Frontend Developer', 'UI Developer', 'React Developer'],
    roadmap: [
      {
        id: 'learn-frontend',
        title: 'Learn the Fundamentals',
        type: 'learn',
        icon: '📚',
        description: 'Master HTML, CSS, and JavaScript basics',
        xpReward: 150,
        order: 1,
        items: [
          {
            id: 'html-basics',
            title: 'HTML Fundamentals',
            description: 'Learn semantic HTML and document structure',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 20,
            prerequisites: [],
            tags: ['html', 'web', 'fundamentals']
          },
          {
            id: 'css-styling',
            title: 'CSS & Styling',
            description: 'Master CSS layouts, flexbox, and grid',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 30,
            prerequisites: ['html-basics'],
            tags: ['css', 'styling', 'layout']
          }
        ]
      }
    ],
    isActive: true
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Design intuitive and beautiful user experiences',
    icon: '🎨',
    color: 'from-pink-400 to-red-500',
    difficulty: 'Beginner',
    timeToMaster: '4-8 months',
    averageSalary: '$65,000 - $110,000',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    industries: ['Technology', 'Design', 'Media', 'Healthcare'],
    jobTitles: ['UX Designer', 'UI Designer', 'Product Designer'],
    roadmap: [
      {
        id: 'learn-ux',
        title: 'Design Fundamentals',
        type: 'learn',
        icon: '📚',
        description: 'Learn design principles and user psychology',
        xpReward: 150,
        order: 1,
        items: [
          {
            id: 'design-principles',
            title: 'Design Principles',
            description: 'Learn color theory, typography, and layout',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 25,
            prerequisites: [],
            tags: ['design', 'principles', 'theory']
          }
        ]
      }
    ],
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Career.deleteMany({});
    await Mentor.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Create careers
    const createdCareers = await Career.create(careers);
    console.log(`💼 Created ${createdCareers.length} careers`);

    // Create mentor profile for Jane Smith
    const janeUser = createdUsers.find(user => user.email === 'jane@example.com');
    if (janeUser) {
      const mentorProfile = {
        userId: janeUser._id,
        title: 'Senior Frontend Developer',
        company: 'Google',
        experience: '6 years',
        bio: 'Passionate about creating accessible and performant web experiences.',
        fullBio: 'Sarah is a Senior Frontend Developer at Google with over 6 years of experience building scalable web applications. She specializes in React, TypeScript, and modern web technologies.',
        expertise: ['React', 'TypeScript', 'Web Performance', 'Accessibility', 'JavaScript'],
        hourlyRate: 150,
        availability: 'Available',
        responseTime: 'Within 2 hours',
        languages: ['English'],
        timezone: 'PST',
        sessionTypes: [
          {
            id: 'code-review',
            name: 'Code Review & Feedback',
            description: 'Get detailed feedback on your code and best practices',
            duration: 60,
            price: 150,
            popular: true,
            isActive: true
          },
          {
            id: 'career-guidance',
            name: 'Career Guidance',
            description: 'Strategic advice for your frontend development career',
            duration: 45,
            price: 120,
            isActive: true
          }
        ],
        availableSlots: [
          {
            id: 's1',
            date: '2024-01-25',
            time: '10:00 AM',
            available: true,
            timezone: 'PST'
          },
          {
            id: 's2',
            date: '2024-01-25',
            time: '2:00 PM',
            available: true,
            timezone: 'PST'
          }
        ],
        isVerified: true,
        isActive: true
      };

      await Mentor.create(mentorProfile);
      console.log('👨‍🏫 Created mentor profile');
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Careers: ${createdCareers.length}`);
    console.log(`   Mentors: 1`);
    console.log('\n🔐 Test Accounts:');
    console.log('   User: john@example.com / password123');
    console.log('   Mentor: jane@example.com / password123');
    console.log('   Admin: admin@jouvi.com / admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();