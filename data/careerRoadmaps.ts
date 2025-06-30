import { Career, QuizQuestion, Mentor } from '../types';

export const careers: Career[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build beautiful, interactive user interfaces and web experiences',
    icon: '💻',
    color: 'from-blue-400 to-purple-500',
    difficulty: 'Beginner',
    timeToMaster: '6-12 months',
    averageSalary: '$70,000 - $120,000',
    roadmap: [
      {
        id: 'learn-frontend',
        title: 'Learn the Fundamentals',
        type: 'learn',
        icon: '📚',
        description: 'Master HTML, CSS, and JavaScript basics',
        xpReward: 150,
        items: [
          {
            id: 'html-basics',
            title: 'HTML Fundamentals',
            description: 'Learn semantic HTML and document structure',
            link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 20
          },
          {
            id: 'css-styling',
            title: 'CSS & Styling',
            description: 'Master CSS layouts, flexbox, and grid',
            link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 30
          },
          {
            id: 'javascript-fundamentals',
            title: 'JavaScript Essentials',
            description: 'Learn variables, functions, and DOM manipulation',
            link: 'https://javascript.info/',
            type: 'course',
            difficulty: 'Medium',
            estimatedHours: 50
          },
          {
            id: 'react-basics',
            title: 'React Framework',
            description: 'Build dynamic UIs with React components',
            link: 'https://react.dev/learn',
            type: 'course',
            difficulty: 'Medium',
            estimatedHours: 40
          }
        ]
      },
      {
        id: 'tools-frontend',
        title: 'Essential Tools',
        type: 'tools',
        icon: '🛠️',
        description: 'Set up your development environment',
        xpReward: 100,
        items: [
          {
            id: 'vscode',
            title: 'VS Code Editor',
            description: 'Install and configure your code editor',
            link: 'https://code.visualstudio.com/',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 2
          },
          {
            id: 'git-github',
            title: 'Git & GitHub',
            description: 'Version control and collaboration',
            link: 'https://git-scm.com/',
            type: 'tool',
            difficulty: 'Medium',
            estimatedHours: 15
          },
          {
            id: 'npm-yarn',
            title: 'Package Managers',
            description: 'Manage dependencies with npm or yarn',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 5
          },
          {
            id: 'browser-devtools',
            title: 'Browser DevTools',
            description: 'Debug and inspect web applications',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 10
          }
        ]
      },
      {
        id: 'practice-frontend',
        title: 'Build Projects',
        type: 'practice',
        icon: '🎯',
        description: 'Apply your skills with hands-on projects',
        xpReward: 200,
        items: [
          {
            id: 'portfolio-website',
            title: 'Personal Portfolio',
            description: 'Create your professional portfolio website',
            type: 'project',
            difficulty: 'Medium',
            estimatedHours: 25
          },
          {
            id: 'todo-app',
            title: 'Todo Application',
            description: 'Build a full-featured todo app with React',
            type: 'project',
            difficulty: 'Medium',
            estimatedHours: 20
          },
          {
            id: 'weather-app',
            title: 'Weather Dashboard',
            description: 'Create a weather app using external APIs',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 30
          },
          {
            id: 'ecommerce-clone',
            title: 'E-commerce Clone',
            description: 'Build a product listing and shopping cart',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 50
          }
        ]
      },
      {
        id: 'apply-frontend',
        title: 'Find Opportunities',
        type: 'apply',
        icon: '📝',
        description: 'Land your first frontend developer role',
        xpReward: 300,
        items: [
          {
            id: 'resume-optimization',
            title: 'Optimize Your Resume',
            description: 'Tailor your resume for frontend positions',
            type: 'resource',
            difficulty: 'Easy',
            estimatedHours: 5
          },
          {
            id: 'coding-challenges',
            title: 'Coding Challenges',
            description: 'Practice with LeetCode and HackerRank',
            link: 'https://leetcode.com/',
            type: 'resource',
            difficulty: 'Medium',
            estimatedHours: 40
          },
          {
            id: 'job-applications',
            title: 'Apply to Positions',
            description: 'Start applying to junior frontend roles',
            type: 'job',
            difficulty: 'Medium',
            estimatedHours: 20
          },
          {
            id: 'interview-prep',
            title: 'Interview Preparation',
            description: 'Practice technical and behavioral interviews',
            type: 'resource',
            difficulty: 'Hard',
            estimatedHours: 30
          }
        ]
      }
    ]
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
    roadmap: [
      {
        id: 'learn-ux',
        title: 'Design Fundamentals',
        type: 'learn',
        icon: '📚',
        description: 'Learn design principles and user psychology',
        xpReward: 150,
        items: [
          {
            id: 'design-principles',
            title: 'Design Principles',
            description: 'Learn color theory, typography, and layout',
            type: 'course',
            difficulty: 'Easy',
            estimatedHours: 25
          },
          {
            id: 'user-research',
            title: 'User Research',
            description: 'Understand user needs and behaviors',
            type: 'course',
            difficulty: 'Medium',
            estimatedHours: 30
          },
          {
            id: 'wireframing',
            title: 'Wireframing & Prototyping',
            description: 'Create low and high-fidelity mockups',
            type: 'course',
            difficulty: 'Medium',
            estimatedHours: 35
          },
          {
            id: 'interaction-design',
            title: 'Interaction Design',
            description: 'Design smooth user interactions and flows',
            type: 'course',
            difficulty: 'Hard',
            estimatedHours: 40
          }
        ]
      },
      {
        id: 'tools-ux',
        title: 'Design Tools',
        type: 'tools',
        icon: '🛠️',
        description: 'Master industry-standard design tools',
        xpReward: 100,
        items: [
          {
            id: 'figma',
            title: 'Figma',
            description: 'Learn collaborative design and prototyping',
            link: 'https://figma.com/',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 20
          },
          {
            id: 'adobe-xd',
            title: 'Adobe XD',
            description: 'Alternative design and prototyping tool',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 15
          },
          {
            id: 'sketch',
            title: 'Sketch',
            description: 'Mac-based design tool for UI/UX',
            type: 'tool',
            difficulty: 'Medium',
            estimatedHours: 18
          },
          {
            id: 'principle',
            title: 'Principle/Framer',
            description: 'Advanced animation and interaction tools',
            type: 'tool',
            difficulty: 'Hard',
            estimatedHours: 25
          }
        ]
      },
      {
        id: 'practice-ux',
        title: 'Design Projects',
        type: 'practice',
        icon: '🎯',
        description: 'Build a strong design portfolio',
        xpReward: 200,
        items: [
          {
            id: 'mobile-app-redesign',
            title: 'Mobile App Redesign',
            description: 'Redesign an existing mobile application',
            type: 'project',
            difficulty: 'Medium',
            estimatedHours: 40
          },
          {
            id: 'website-design',
            title: 'Website Design',
            description: 'Design a complete website from scratch',
            type: 'project',
            difficulty: 'Medium',
            estimatedHours: 35
          },
          {
            id: 'design-system',
            title: 'Design System',
            description: 'Create a comprehensive design system',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 50
          },
          {
            id: 'user-testing',
            title: 'User Testing Project',
            description: 'Conduct user research and testing',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 30
          }
        ]
      },
      {
        id: 'apply-ux',
        title: 'Find Design Roles',
        type: 'apply',
        icon: '📝',
        description: 'Land your first UX/UI designer position',
        xpReward: 300,
        items: [
          {
            id: 'portfolio-website-ux',
            title: 'Build Design Portfolio',
            description: 'Create an impressive online portfolio',
            type: 'resource',
            difficulty: 'Medium',
            estimatedHours: 30
          },
          {
            id: 'design-challenges',
            title: 'Design Challenges',
            description: 'Practice with daily UI challenges',
            type: 'resource',
            difficulty: 'Medium',
            estimatedHours: 25
          },
          {
            id: 'networking',
            title: 'Design Community',
            description: 'Join design communities and events',
            type: 'resource',
            difficulty: 'Easy',
            estimatedHours: 10
          },
          {
            id: 'freelance-projects',
            title: 'Freelance Projects',
            description: 'Take on small design projects',
            type: 'job',
            difficulty: 'Medium',
            estimatedHours: 40
          }
        ]
      }
    ]
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    description: 'Build intelligent systems and AI applications',
    icon: '🤖',
    color: 'from-green-400 to-blue-500',
    difficulty: 'Advanced',
    timeToMaster: '12-18 months',
    averageSalary: '$90,000 - $150,000',
    roadmap: [
      {
        id: 'learn-ml',
        title: 'ML Fundamentals',
        type: 'learn',
        icon: '📚',
        description: 'Master mathematics and programming for ML',
        xpReward: 200,
        items: [
          {
            id: 'python-programming',
            title: 'Python Programming',
            description: 'Master Python for data science and ML',
            type: 'course',
            difficulty: 'Medium',
            estimatedHours: 50
          },
          {
            id: 'mathematics',
            title: 'Mathematics for ML',
            description: 'Linear algebra, calculus, and statistics',
            type: 'course',
            difficulty: 'Hard',
            estimatedHours: 80
          },
          {
            id: 'ml-algorithms',
            title: 'ML Algorithms',
            description: 'Supervised, unsupervised, and reinforcement learning',
            type: 'course',
            difficulty: 'Hard',
            estimatedHours: 60
          },
          {
            id: 'deep-learning',
            title: 'Deep Learning',
            description: 'Neural networks and deep learning frameworks',
            type: 'course',
            difficulty: 'Hard',
            estimatedHours: 70
          }
        ]
      },
      {
        id: 'tools-ml',
        title: 'ML Tools & Frameworks',
        type: 'tools',
        icon: '🛠️',
        description: 'Learn essential ML libraries and platforms',
        xpReward: 150,
        items: [
          {
            id: 'pandas-numpy',
            title: 'Pandas & NumPy',
            description: 'Data manipulation and numerical computing',
            type: 'tool',
            difficulty: 'Medium',
            estimatedHours: 25
          },
          {
            id: 'scikit-learn',
            title: 'Scikit-learn',
            description: 'Machine learning library for Python',
            type: 'tool',
            difficulty: 'Medium',
            estimatedHours: 30
          },
          {
            id: 'tensorflow-pytorch',
            title: 'TensorFlow/PyTorch',
            description: 'Deep learning frameworks',
            type: 'tool',
            difficulty: 'Hard',
            estimatedHours: 40
          },
          {
            id: 'jupyter-colab',
            title: 'Jupyter & Google Colab',
            description: 'Interactive development environments',
            type: 'tool',
            difficulty: 'Easy',
            estimatedHours: 10
          }
        ]
      },
      {
        id: 'practice-ml',
        title: 'ML Projects',
        type: 'practice',
        icon: '🎯',
        description: 'Build real-world ML applications',
        xpReward: 250,
        items: [
          {
            id: 'data-analysis',
            title: 'Data Analysis Project',
            description: 'Analyze and visualize a real dataset',
            type: 'project',
            difficulty: 'Medium',
            estimatedHours: 30
          },
          {
            id: 'predictive-model',
            title: 'Predictive Model',
            description: 'Build a machine learning prediction model',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 45
          },
          {
            id: 'computer-vision',
            title: 'Computer Vision App',
            description: 'Create an image classification system',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 60
          },
          {
            id: 'nlp-project',
            title: 'NLP Application',
            description: 'Build a natural language processing tool',
            type: 'project',
            difficulty: 'Hard',
            estimatedHours: 55
          }
        ]
      },
      {
        id: 'apply-ml',
        title: 'ML Career Path',
        type: 'apply',
        icon: '📝',
        description: 'Launch your ML engineering career',
        xpReward: 350,
        items: [
          {
            id: 'kaggle-competitions',
            title: 'Kaggle Competitions',
            description: 'Participate in ML competitions',
            link: 'https://kaggle.com/',
            type: 'resource',
            difficulty: 'Hard',
            estimatedHours: 60
          },
          {
            id: 'research-papers',
            title: 'Read Research Papers',
            description: 'Stay updated with latest ML research',
            type: 'resource',
            difficulty: 'Hard',
            estimatedHours: 40
          },
          {
            id: 'ml-internship',
            title: 'ML Internship',
            description: 'Apply for ML/AI internships',
            type: 'job',
            difficulty: 'Hard',
            estimatedHours: 30
          },
          {
            id: 'open-source',
            title: 'Open Source Contributions',
            description: 'Contribute to ML open source projects',
            type: 'resource',
            difficulty: 'Hard',
            estimatedHours: 50
          }
        ]
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
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

export const mentors: Mentor[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    company: 'Google',
    experience: '6 years',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=200',
    bio: 'Passionate about creating accessible and performant web experiences. Love mentoring newcomers to the field.',
    expertise: ['React', 'TypeScript', 'Web Performance', 'Accessibility'],
    linkedIn: 'https://linkedin.com/in/sarahchen'
  },
  {
    id: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    title: 'Lead UX Designer',
    company: 'Airbnb',
    experience: '8 years',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Design thinking advocate with experience in both B2B and B2C products. Always excited to help aspiring designers.',
    expertise: ['User Research', 'Design Systems', 'Prototyping', 'Design Strategy'],
    linkedIn: 'https://linkedin.com/in/marcusrodriguez'
  },
  {
    id: 'dr-aisha-patel',
    name: 'Dr. Aisha Patel',
    title: 'ML Research Scientist',
    company: 'OpenAI',
    experience: '10 years',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=200',
    bio: 'PhD in Computer Science with focus on deep learning. Passionate about making AI accessible to everyone.',
    expertise: ['Deep Learning', 'NLP', 'Computer Vision', 'Research'],
    linkedIn: 'https://linkedin.com/in/aishapatekl'
  }
];