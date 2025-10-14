// models/Newsletter.js

const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  
  name: {
    type: String,
    trim: true,
  },
  
  subscribed: {
    type: Boolean,
    default: true,
  },
  
  subscribedDate: {
    type: Date,
    default: Date.now,
  },
  
  unsubscribedDate: {
    type: Date,
  },
  
  source: {
    type: String,
    enum: ['Website', 'Event', 'Service', 'Manual', 'Other'],
    default: 'Website',
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Newsletter', newsletterSchema);