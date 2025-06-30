const mongoose = require('mongoose');

const sessionTypeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  popular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const timeSlotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  timezone: {
    type: String,
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
});

const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  menteeName: {
    type: String,
    required: true
  },
  menteeAvatar: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  sessionType: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
}, {
  timestamps: true
});

const mentorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a professional title']
  },
  company: {
    type: String,
    required: [true, 'Please provide current company']
  },
  experience: {
    type: String,
    required: [true, 'Please provide years of experience']
  },
  bio: {
    type: String,
    required: [true, 'Please provide a short bio'],
    maxlength: [200, 'Bio cannot exceed 200 characters']
  },
  fullBio: {
    type: String,
    required: [true, 'Please provide a detailed bio'],
    maxlength: [1000, 'Full bio cannot exceed 1000 characters']
  },
  expertise: {
    type: [String],
    required: [true, 'Please provide areas of expertise'],
    validate: {
      validator: function(v) {
        return v && v.length > 0 && v.length <= 10;
      },
      message: 'Please provide 1-10 areas of expertise'
    }
  },
  specializations: [String],
  achievements: [String],
  education: [String],
  certifications: [String],
  linkedIn: String,
  website: String,
  hourlyRate: {
    type: Number,
    required: [true, 'Please provide hourly rate'],
    min: [0, 'Hourly rate cannot be negative']
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Offline'],
    default: 'Available'
  },
  responseTime: {
    type: String,
    default: 'Within 24 hours'
  },
  languages: {
    type: [String],
    default: ['English']
  },
  timezone: {
    type: String,
    required: [true, 'Please provide timezone']
  },
  sessionTypes: [sessionTypeSchema],
  availableSlots: [timeSlotSchema],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  stripeAccountId: String,
  bankingInfo: {
    accountHolder: String,
    accountNumber: String,
    routingNumber: String,
    bankName: String
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    autoAcceptBookings: {
      type: Boolean,
      default: false
    },
    bufferTime: {
      type: Number,
      default: 15
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
mentorSchema.index({ userId: 1 });
mentorSchema.index({ expertise: 1 });
mentorSchema.index({ hourlyRate: 1 });
mentorSchema.index({ rating: -1 });
mentorSchema.index({ availability: 1 });
mentorSchema.index({ isActive: 1, isVerified: 1 });

// Virtual to populate user data
mentorSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Method to calculate average rating
mentorSchema.methods.calculateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
  this.reviewCount = this.reviews.length;
};

// Method to add review
mentorSchema.methods.addReview = function(reviewData) {
  this.reviews.push(reviewData);
  this.calculateRating();
  return this.save();
};

// Method to update availability
mentorSchema.methods.updateAvailability = function(status) {
  this.availability = status;
  this.lastActive = new Date();
  return this.save();
};

// Pre-save middleware to calculate rating
mentorSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.calculateRating();
  }
  next();
});

module.exports = mongoose.model('Mentor', mentorSchema);