export interface Career {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToMaster: string;
  averageSalary: string;
  roadmap: RoadmapSection[];
}

export interface RoadmapSection {
  id: string;
  title: string;
  type: 'learn' | 'tools' | 'practice' | 'apply';
  icon: string;
  description: string;
  items: RoadmapItem[];
  xpReward: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  type: 'course' | 'tool' | 'project' | 'job' | 'resource';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  careerWeights: { [careerId: string]: number };
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: string;
  avatar: string;
  bio: string;
  expertise: string[];
  linkedIn?: string;
  rating?: number;
  reviewCount?: number;
  hourlyRate?: number;
  availability?: 'Available' | 'Busy' | 'Offline';
  responseTime?: string;
  languages?: string[];
  timezone?: string;
}

export interface MentorProfile extends Mentor {
  fullBio: string;
  achievements: string[];
  education: string[];
  certifications: string[];
  specializations: string[];
  sessionTypes: SessionType[];
  reviews: Review[];
  availableSlots: TimeSlot[];
}

export interface SessionType {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  popular?: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  timezone: string;
}

export interface Review {
  id: string;
  menteeId: string;
  menteeName: string;
  menteeAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  sessionType: string;
  verified: boolean;
}

export interface BookingRequest {
  mentorId: string;
  sessionTypeId: string;
  timeSlotId: string;
  menteeInfo: {
    name: string;
    email: string;
    phone?: string;
    goals: string;
    experience: string;
  };
  paymentInfo: {
    method: 'card' | 'paypal';
    amount: number;
  };
}

export interface UserProgress {
  selectedCareer: string;
  completedItems: string[];
  currentXP: number;
  level: number;
  alternativeCareer?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  progress?: UserProgress;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MastersAdvisoryInput {
  academicBackground: string;
  currentDegree: string;
  gpa: string;
  studyGoals: string[];
  preferredCountries: string[];
  budgetRange: string;
  programInterests: string[];
  workExperience: string;
}

export interface CountryRecommendation {
  country: string;
  flag: string;
  score: number;
  reasons: string[];
  visaRequirements: string[];
  averageCost: string;
  topUniversities: string[];
  careerOpportunities: string[];
}

export interface CareerAnalysisInput {
  technicalSkills: string[];
  academicPerformance: {
    gpa: string;
    degree: string;
    major: string;
  };
  interests: string[];
  workExperience: string;
}

export interface CareerRecommendation {
  role: string;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  missingSkills: string[];
  salaryRange: string;
  growthPotential: string;
  roadmap: string[];
}