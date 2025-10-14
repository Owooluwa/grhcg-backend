// models/Sermon.js

const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: [true, 'Please provide sermon title'],
    trim: true,
  },
  
  preacher: {
    type: String,
    required: [true, 'Please provide preacher name'],
    trim: true,
  },
  
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  
  scripture: {
    type: String,
    trim: true,
  },
  
  description: {
    type: String,
    required: [true, 'Please provide sermon description'],
  },
  
  // Media files
  audioUrl: {
    type: String,
  },
  
  videoUrl: {
    type: String,
  },
  
  thumbnailUrl: {
    type: String,
    default: '/images/default-sermon-thumbnail.jpg',
  },
  
  // Additional info
  duration: {
    type: String, // e.g., "45:30"
  },
  
  category: {
    type: String,
    enum: ['Sunday Service', 'Midweek Service', 'Special Event', 'Bible Study', 'Conference', 'Other'],
    default: 'Sunday Service',
  },
  
  series: {
    type: String,
    trim: true,
  },
  
  tags: [{
    type: String,
  }],
  
  views: {
    type: Number,
    default: 0,
  },
  
  downloads: {
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
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sermon', sermonSchema);