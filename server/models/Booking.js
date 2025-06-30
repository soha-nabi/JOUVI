const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionTypeId: {
    type: String,
    required: true
  },
  sessionType: {
    name: String,
    description: String,
    duration: Number,
    price: Number
  },
  timeSlot: {
    id: String,
    date: String,
    time: String,
    timezone: String
  },
  menteeInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    goals: {
      type: String,
      required: true
    },
    experience: String
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['card', 'paypal'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    stripePaymentIntentId: String,
    paypalOrderId: String,
    transactionId: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  meetingDetails: {
    platform: {
      type: String,
      enum: ['zoom', 'google-meet', 'teams', 'custom'],
      default: 'zoom'
    },
    meetingUrl: String,
    meetingId: String,
    password: String,
    dialInNumbers: [String]
  },
  notes: {
    mentorNotes: String,
    menteeNotes: String,
    sessionSummary: String
  },
  feedback: {
    mentorRating: {
      type: Number,
      min: 1,
      max: 5
    },
    menteeRating: {
      type: Number,
      min: 1,
      max: 5
    },
    mentorComment: String,
    menteeComment: String,
    improvementAreas: [String],
    followUpActions: [String]
  },
  reminders: {
    sent24h: {
      type: Boolean,
      default: false
    },
    sent1h: {
      type: Boolean,
      default: false
    },
    sentFollowUp: {
      type: Boolean,
      default: false
    }
  },
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ['mentor', 'mentee', 'admin']
    },
    reason: String,
    cancelledAt: Date,
    refundAmount: Number,
    refundProcessed: {
      type: Boolean,
      default: false
    }
  },
  reschedule: {
    requestedBy: {
      type: String,
      enum: ['mentor', 'mentee']
    },
    originalTimeSlot: {
      date: String,
      time: String,
      timezone: String
    },
    newTimeSlot: {
      date: String,
      time: String,
      timezone: String
    },
    reason: String,
    approved: {
      type: Boolean,
      default: false
    },
    rescheduledAt: Date
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringDetails: {
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly']
    },
    endDate: Date,
    totalSessions: Number,
    completedSessions: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
bookingSchema.index({ mentorId: 1, menteeId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'timeSlot.date': 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual for booking duration in minutes
bookingSchema.virtual('durationMinutes').get(function() {
  return this.sessionType.duration;
});

// Virtual for booking date/time as Date object
bookingSchema.virtual('scheduledDateTime').get(function() {
  if (this.timeSlot.date && this.timeSlot.time) {
    return new Date(`${this.timeSlot.date} ${this.timeSlot.time}`);
  }
  return null;
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const scheduledTime = this.scheduledDateTime;
  
  if (!scheduledTime) return false;
  
  // Can cancel up to 24 hours before the session
  const hoursUntilSession = (scheduledTime - now) / (1000 * 60 * 60);
  return hoursUntilSession >= 24 && this.status === 'confirmed';
};

// Method to check if booking can be rescheduled
bookingSchema.methods.canBeRescheduled = function() {
  const now = new Date();
  const scheduledTime = this.scheduledDateTime;
  
  if (!scheduledTime) return false;
  
  // Can reschedule up to 48 hours before the session
  const hoursUntilSession = (scheduledTime - now) / (1000 * 60 * 60);
  return hoursUntilSession >= 48 && this.status === 'confirmed';
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefund = function() {
  const now = new Date();
  const scheduledTime = this.scheduledDateTime;
  
  if (!scheduledTime) return 0;
  
  const hoursUntilSession = (scheduledTime - now) / (1000 * 60 * 60);
  
  if (hoursUntilSession >= 24) {
    return this.paymentInfo.amount; // Full refund
  } else if (hoursUntilSession >= 12) {
    return this.paymentInfo.amount * 0.5; // 50% refund
  } else {
    return 0; // No refund
  }
};

// Pre-save middleware
bookingSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed') {
    // Update mentor's total sessions and earnings
    const Mentor = mongoose.model('Mentor');
    Mentor.findByIdAndUpdate(
      this.mentorId,
      {
        $inc: {
          totalSessions: 1,
          totalEarnings: this.paymentInfo.amount
        }
      }
    ).exec();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);