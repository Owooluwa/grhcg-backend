// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true,
  },
  
  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
  
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  
  endDate: {
    type: Date,
  },
  
  startTime: {
    type: String,
    required: [true, 'Please provide start time'],
  },
  
  endTime: {
    type: String,
  },
  
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  
  address: {
    type: String,
  },
  
  category: {
    type: String,
    enum: [
      'Service',
      'Conference',
      'Seminar',
      'Outreach',
      'Youth Event',
      'Prayer Meeting',
      'Bible Study',
      'Fellowship',
      'Special Program',
      'Other'
    ],
    default: 'Service',
  },
  
  imageUrl: {
    type: String,
    default: '/images/default-event-image.jpg',
  },
  
  organizer: {
    name: String,
    email: String,
    phone: String,
  },
  
  registrationRequired: {
    type: Boolean,
    default: false,
  },
  
  registrationDeadline: {
    type: Date,
  },
  
  registrationLink: {
    type: String,
  },
  
  capacity: {
    type: Number,
  },
  
  registeredCount: {
    type: Number,
    default: 0,
  },
  
  price: {
    type: Number,
    default: 0,
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
  
  published: {
    type: Boolean,
    default: true,
  },
  
  tags: [{
    type: String,
  }],
  
}, {
  timestamps: true,
});

// Index for faster queries on dates
eventSchema.index({ startDate: 1 });

module.exports = mongoose.model('Event', eventSchema);