// models/Testimony.js

const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  
  phone: {
    type: String,
  },
  
  title: {
    type: String,
    required: [true, 'Please provide testimony title'],
    trim: true,
  },
  
  content: {
    type: String,
    required: [true, 'Please share your testimony'],
    minlength: [20, 'Testimony must be at least 20 characters'],
  },
  
  category: {
    type: String,
    enum: [
      'Healing',
      'Salvation',
      'Financial Breakthrough',
      'Deliverance',
      'Answered Prayer',
      'Marriage/Family',
      'Career/Business',
      'Protection',
      'Other'
    ],
    default: 'Other',
  },
  
  photoUrl: {
    type: String,
  },
  
  videoUrl: {
    type: String,
  },
  
  approved: {
    type: Boolean,
    default: false,
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
  
  published: {
    type: Boolean,
    default: false,
  },
  
  likes: {
    type: Number,
    default: 0,
  },
  
  views: {
    type: Number,
    default: 0,
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Testimony', testimonySchema);