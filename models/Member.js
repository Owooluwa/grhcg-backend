// models/Member.js

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
  },
  
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
  },
  
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  
  dateOfBirth: {
    type: Date,
  },
  
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  
  address: {
    street: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: 'Nigeria',
    },
  },
  
  membershipType: {
    type: String,
    enum: ['New Member', 'Active Member', 'Youth', 'Children', 'Visitor'],
    default: 'New Member',
  },
  
  joinDate: {
    type: Date,
    default: Date.now,
  },
  
  baptized: {
    type: Boolean,
    default: false,
  },
  
  baptismDate: {
    type: Date,
  },
  
  ministries: [{
    type: String,
  }],
  
  skills: [{
    type: String,
  }],
  
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Transferred', 'Pending Approval'],
    default: 'Pending Approval',
  },
  
  photoUrl: {
    type: String,
    default: '/images/default-profile.jpg',
  },
  
  notes: {
    type: String,
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Member', memberSchema);