const mongoose = require('mongoose');

const roadmapItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: String,
  type: {
    type: String,
    enum: ['course', 'tool', 'project', 'job', 'resource'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  estimatedHours: {
    type: Number,
    required: true
  },
  prerequisites: [String],
  tags: [String]
});

const roadmapSectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['learn', 'tools', 'practice', 'apply'],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: [roadmapItemSchema],
  xpReward: {
    type: Number,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});

const careerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a career title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a career description']
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  timeToMaster: {
    type: String,
    required: true
  },
  averageSalary: {
    type: String,
    required: true
  },
  roadmap: [roadmapSectionSchema],
  skills: [String],
  industries: [String],
  jobTitles: [String],
  growthRate: String,
  demandLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High'],
    default: 'Medium'
  },
  remoteWorkFriendly: {
    type: Boolean,
    default: false
  },
  educationRequirements: [String],
  certifications: [String],
  relatedCareers: [String],
  marketTrends: {
    currentDemand: Number,
    futureOutlook: String,
    topCompanies: [String],
    emergingSkills: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
careerSchema.index({ id: 1 });
careerSchema.index({ title: 'text', description: 'text' });
careerSchema.index({ difficulty: 1 });
careerSchema.index({ skills: 1 });
careerSchema.index({ isActive: 1 });

// Virtual for total XP
careerSchema.virtual('totalXP').get(function() {
  return this.roadmap.reduce((total, section) => total + section.xpReward, 0);
});

// Virtual for total items
careerSchema.virtual('totalItems').get(function() {
  return this.roadmap.reduce((total, section) => total + section.items.length, 0);
});

// Virtual for estimated total hours
careerSchema.virtual('totalHours').get(function() {
  return this.roadmap.reduce((total, section) => {
    return total + section.items.reduce((sectionTotal, item) => sectionTotal + item.estimatedHours, 0);
  }, 0);
});

module.exports = mongoose.model('Career', careerSchema);