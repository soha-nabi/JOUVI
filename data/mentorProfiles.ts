import { MentorProfile, SessionType, Review, TimeSlot } from '../types';

export const mentorProfiles: MentorProfile[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    company: 'Google',
    experience: '6 years',
    avatar:'4.png',
    bio: 'Passionate about creating accessible and performant web experiences.',
    fullBio: 'Sarah is a Senior Frontend Developer at Google with over 6 years of experience building scalable web applications. She specializes in React, TypeScript, and modern web technologies. Sarah has led multiple high-impact projects and is passionate about mentoring the next generation of developers.',
    expertise: ['React', 'TypeScript', 'Web Performance', 'Accessibility', 'JavaScript'],
    linkedIn: 'https://linkedin.com/in/sarahchen',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    availability: 'Available',
    responseTime: 'Within 2 hours',
    languages: ['English', 'Mandarin'],
    timezone: 'PST',
    achievements: [
      'Led frontend architecture for Google Pay mobile web',
      'Speaker at React Conf 2023',
      'Contributed to React DevTools',
      'Mentored 50+ junior developers'
    ],
    education: [
      'MS Computer Science - Stanford University',
      'BS Software Engineering - UC Berkeley'
    ],
    certifications: [
      'Google Cloud Professional Developer',
      'AWS Certified Solutions Architect'
    ],
    specializations: [
      'Frontend Architecture',
      'React Ecosystem',
      'Performance Optimization',
      'Career Transition',
      'Technical Interviews'
    ],
    sessionTypes: [
      {
        id: 'code-review',
        name: 'Code Review & Feedback',
        description: 'Get detailed feedback on your code and best practices',
        duration: 60,
        price: 150,
        popular: true
      },
      {
        id: 'career-guidance',
        name: 'Career Guidance',
        description: 'Strategic advice for your frontend development career',
        duration: 45,
        price: 120
      },
      {
        id: 'interview-prep',
        name: 'Technical Interview Prep',
        description: 'Practice coding interviews and system design',
        duration: 90,
        price: 200,
        popular: true
      },
      {
        id: 'portfolio-review',
        name: 'Portfolio Review',
        description: 'Comprehensive review of your portfolio and projects',
        duration: 60,
        price: 130
      }
    ],
    reviews: [
      {
        id: 'r1',
        menteeId: 'u1',
        menteeName: 'Alex Johnson',
        menteeAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        comment: 'Sarah provided incredible insights into React best practices. Her feedback on my code was detailed and actionable. Highly recommend!',
        date: '2024-01-15',
        sessionType: 'Code Review & Feedback',
        verified: true
      },
      {
        id: 'r2',
        menteeId: 'u2',
        menteeName: 'Maria Garcia',
        rating: 5,
        comment: 'Excellent career guidance session. Sarah helped me understand the path to senior developer role and gave me a clear roadmap.',
        date: '2024-01-10',
        sessionType: 'Career Guidance',
        verified: true
      },
      {
        id: 'r3',
        menteeId: 'u3',
        menteeName: 'David Kim',
        rating: 4,
        comment: 'Great interview preparation. Sarah\'s mock interviews were challenging and helped me land my dream job at a tech startup.',
        date: '2024-01-05',
        sessionType: 'Technical Interview Prep',
        verified: true
      }
    ],
    availableSlots: [
      { id: 's1', date: '2024-01-25', time: '10:00 AM', available: true, timezone: 'PST' },
      { id: 's2', date: '2024-01-25', time: '2:00 PM', available: true, timezone: 'PST' },
      { id: 's3', date: '2024-01-26', time: '11:00 AM', available: true, timezone: 'PST' },
      { id: 's4', date: '2024-01-26', time: '3:00 PM', available: false, timezone: 'PST' },
      { id: 's5', date: '2024-01-27', time: '9:00 AM', available: true, timezone: 'PST' }
    ]
  },
  {
    id: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    title: 'Lead UX Designer',
    company: 'Airbnb',
    experience: '8 years',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Design thinking advocate with experience in both B2B and B2C products.',
    fullBio: 'Marcus is a Lead UX Designer at Airbnb with 8 years of experience in product design. He has worked on everything from mobile apps to complex enterprise software. Marcus is passionate about user research and creating inclusive design experiences.',
    expertise: ['User Research', 'Design Systems', 'Prototyping', 'Design Strategy', 'Figma'],
    linkedIn: 'https://linkedin.com/in/marcusrodriguez',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 140,
    availability: 'Available',
    responseTime: 'Within 4 hours',
    languages: ['English', 'Spanish'],
    timezone: 'PST',
    achievements: [
      'Led design for Airbnb Host mobile app (10M+ users)',
      'Design Systems Conference speaker',
      'Adobe Design Achievement Award 2023',
      'Mentored 30+ designers globally'
    ],
    education: [
      'MFA Interaction Design - Art Center College',
      'BA Graphic Design - UCLA'
    ],
    certifications: [
      'Google UX Design Certificate',
      'Nielsen Norman Group UX Certification'
    ],
    specializations: [
      'User Experience Design',
      'Design Systems',
      'User Research',
      'Product Strategy',
      'Design Leadership'
    ],
    sessionTypes: [
      {
        id: 'portfolio-review-ux',
        name: 'UX Portfolio Review',
        description: 'Comprehensive review of your UX portfolio and case studies',
        duration: 75,
        price: 140,
        popular: true
      },
      {
        id: 'design-critique',
        name: 'Design Critique',
        description: 'Get feedback on your design work and process',
        duration: 60,
        price: 120
      },
      {
        id: 'career-transition-ux',
        name: 'Career Transition to UX',
        description: 'Guidance for transitioning into UX design career',
        duration: 90,
        price: 180
      },
      {
        id: 'user-research-methods',
        name: 'User Research Methods',
        description: 'Learn practical user research techniques',
        duration: 60,
        price: 130
      }
    ],
    reviews: [
      {
        id: 'r4',
        menteeId: 'u4',
        menteeName: 'Jennifer Liu',
        rating: 5,
        comment: 'Marcus gave me invaluable feedback on my portfolio. His insights helped me land interviews at top tech companies.',
        date: '2024-01-12',
        sessionType: 'UX Portfolio Review',
        verified: true
      },
      {
        id: 'r5',
        menteeId: 'u5',
        menteeName: 'Robert Chen',
        rating: 5,
        comment: 'Excellent session on user research methods. Marcus shared real-world examples from his work at Airbnb.',
        date: '2024-01-08',
        sessionType: 'User Research Methods',
        verified: true
      }
    ],
    availableSlots: [
      { id: 's6', date: '2024-01-25', time: '1:00 PM', available: true, timezone: 'PST' },
      { id: 's7', date: '2024-01-25', time: '4:00 PM', available: true, timezone: 'PST' },
      { id: 's8', date: '2024-01-26', time: '10:00 AM', available: false, timezone: 'PST' },
      { id: 's9', date: '2024-01-27', time: '2:00 PM', available: true, timezone: 'PST' }
    ]
  },
  {
    id: 'dr-aisha-patel',
    name: 'Dr. Aisha Patel',
    title: 'ML Research Scientist',
    company: 'OpenAI',
    experience: '10 years',
    avatar: '3.png',
    bio: 'PhD in Computer Science with focus on deep learning.',
    fullBio: 'Dr. Aisha Patel is a Machine Learning Research Scientist at OpenAI with over 10 years of experience in AI/ML. She holds a PhD in Computer Science and has published 25+ research papers. Aisha specializes in deep learning, NLP, and computer vision.',
    expertise: ['Deep Learning', 'NLP', 'Computer Vision', 'Research', 'Python'],
    linkedIn: 'https://linkedin.com/in/aishapatekl',
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 200,
    availability: 'Busy',
    responseTime: 'Within 24 hours',
    languages: ['English', 'Hindi', 'Gujarati'],
    timezone: 'PST',
    achievements: [
      'Published 25+ papers in top-tier ML conferences',
      'Led GPT-4 safety research team',
      'MIT Technology Review Innovator Under 35',
      'Keynote speaker at NeurIPS 2023'
    ],
    education: [
      'PhD Computer Science - MIT',
      'MS Artificial Intelligence - Stanford',
      'BTech Computer Engineering - IIT Bombay'
    ],
    certifications: [
      'Google Cloud ML Engineer',
      'AWS Machine Learning Specialty'
    ],
    specializations: [
      'Machine Learning Research',
      'Deep Learning',
      'Natural Language Processing',
      'AI Ethics',
      'PhD Guidance'
    ],
    sessionTypes: [
      {
        id: 'research-guidance',
        name: 'ML Research Guidance',
        description: 'Guidance on ML research projects and paper writing',
        duration: 90,
        price: 250,
        popular: true
      },
      {
        id: 'phd-mentoring',
        name: 'PhD Mentoring',
        description: 'Support for PhD students in AI/ML',
        duration: 60,
        price: 200
      },
      {
        id: 'ml-career-path',
        name: 'ML Career Strategy',
        description: 'Strategic advice for ML engineering and research careers',
        duration: 75,
        price: 220
      },
      {
        id: 'paper-review',
        name: 'Research Paper Review',
        description: 'Detailed review of your research papers',
        duration: 120,
        price: 300
      }
    ],
    reviews: [
      {
        id: 'r6',
        menteeId: 'u6',
        menteeName: 'James Wilson',
        rating: 5,
        comment: 'Dr. Patel\'s guidance on my ML research was exceptional. Her feedback helped me publish my first paper at ICML.',
        date: '2024-01-14',
        sessionType: 'ML Research Guidance',
        verified: true
      },
      {
        id: 'r7',
        menteeId: 'u7',
        menteeName: 'Priya Sharma',
        rating: 5,
        comment: 'Incredible PhD mentoring session. Aisha helped me navigate the challenges of my doctoral research.',
        date: '2024-01-09',
        sessionType: 'PhD Mentoring',
        verified: true
      }
    ],
    availableSlots: [
      { id: 's10', date: '2024-01-28', time: '11:00 AM', available: true, timezone: 'PST' },
      { id: 's11', date: '2024-01-29', time: '2:00 PM', available: true, timezone: 'PST' },
      { id: 's12', date: '2024-01-30', time: '10:00 AM', available: false, timezone: 'PST' }
    ]
  },
  {
    id: 'Rohit-Rajput',
    name: 'Rohit Rajput',
    title: 'Product Manager',
    company: 'Microsoft',
    experience: '7 years',
    avatar: '6.png',
    bio: 'Product strategy expert with experience in B2B and consumer products.',
    fullBio: 'Emily is a Senior Product Manager at Microsoft with 7 years of experience in product management. She has launched multiple successful products and specializes in product strategy, user research, and go-to-market planning.',
    expertise: ['Product Strategy', 'User Research', 'Analytics', 'Roadmapping', 'Leadership'],
    linkedIn: 'https://linkedin.com/in/emilyjohnson',
    rating: 4.7,
    reviewCount: 73,
    hourlyRate: 160,
    availability: 'Available',
    responseTime: 'Within 6 hours',
    languages: ['English'],
    timezone: 'EST',
    achievements: [
      'Launched Microsoft Teams mobile app',
      'Product Management Conference speaker',
      'Led product team of 15+ members',
      'Increased user engagement by 40%'
    ],
    education: [
      'MBA - Wharton School',
      'BS Computer Science - Carnegie Mellon'
    ],
    certifications: [
      'Certified Product Manager (CPM)',
      'Google Analytics Certified'
    ],
    specializations: [
      'Product Management',
      'Product Strategy',
      'User Research',
      'Data Analytics',
      'Team Leadership'
    ],
    sessionTypes: [
      {
        id: 'pm-career-guidance',
        name: 'PM Career Guidance',
        description: 'Strategic advice for product management career',
        duration: 60,
        price: 160,
        popular: true
      },
      {
        id: 'product-strategy',
        name: 'Product Strategy Session',
        description: 'Help with product roadmap and strategy',
        duration: 90,
        price: 200
      },
      {
        id: 'pm-interview-prep',
        name: 'PM Interview Preparation',
        description: 'Practice product management interviews',
        duration: 75,
        price: 180
      }
    ],
    reviews: [
      {
        id: 'r8',
        menteeId: 'u8',
        menteeName: 'Michael Brown',
        rating: 5,
        comment: 'Emily\'s product strategy insights were game-changing for my startup. Highly recommend her sessions.',
        date: '2024-01-11',
        sessionType: 'Product Strategy Session',
        verified: true
      }
    ],
    availableSlots: [
      { id: 's13', date: '2024-01-25', time: '9:00 AM', available: true, timezone: 'EST' },
      { id: 's14', date: '2024-01-26', time: '1:00 PM', available: true, timezone: 'EST' }
    ]
  },
  {
    id: 'carlos-mendez',
    name: 'Carlos Mendez',
    title: 'DevOps Engineer',
    company: 'Netflix',
    experience: '9 years',
    avatar: '5.png',
    bio: 'Cloud infrastructure and automation expert.',
    fullBio: 'Carlos is a Senior DevOps Engineer at Netflix with 9 years of experience in cloud infrastructure, automation, and scalable systems. He specializes in AWS, Kubernetes, and CI/CD pipelines.',
    expertise: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Infrastructure'],
    linkedIn: 'https://linkedin.com/in/carlosmendez',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 170,
    availability: 'Available',
    responseTime: 'Within 3 hours',
    languages: ['English', 'Spanish'],
    timezone: 'PST',
    achievements: [
      'Architected Netflix\'s global CDN infrastructure',
      'AWS re:Invent speaker 2023',
      'Reduced deployment time by 80%',
      'Led migration to microservices'
    ],
    education: [
      'MS Computer Science - UC San Diego',
      'BS Software Engineering - Universidad de Chile'
    ],
    certifications: [
      'AWS Solutions Architect Professional',
      'Certified Kubernetes Administrator',
      'Google Cloud Professional DevOps Engineer'
    ],
    specializations: [
      'Cloud Architecture',
      'DevOps Practices',
      'Kubernetes',
      'Infrastructure as Code',
      'Site Reliability Engineering'
    ],
    sessionTypes: [
      {
        id: 'devops-career',
        name: 'DevOps Career Path',
        description: 'Guidance on DevOps and SRE career progression',
        duration: 60,
        price: 170
      },
      {
        id: 'cloud-architecture',
        name: 'Cloud Architecture Review',
        description: 'Review and optimize your cloud infrastructure',
        duration: 90,
        price: 220,
        popular: true
      },
      {
        id: 'kubernetes-mentoring',
        name: 'Kubernetes Mentoring',
        description: 'Learn Kubernetes best practices and troubleshooting',
        duration: 75,
        price: 190
      }
    ],
    reviews: [
      {
        id: 'r9',
        menteeId: 'u9',
        menteeName: 'Lisa Wang',
        rating: 5,
        comment: 'Carlos helped me design a scalable cloud architecture for our startup. His expertise saved us months of work.',
        date: '2024-01-13',
        sessionType: 'Cloud Architecture Review',
        verified: true
      }
    ],
    availableSlots: [
      { id: 's15', date: '2024-01-25', time: '3:00 PM', available: true, timezone: 'PST' },
      { id: 's16', date: '2024-01-27', time: '11:00 AM', available: true, timezone: 'PST' }
    ]
  }
];