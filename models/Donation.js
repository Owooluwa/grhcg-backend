// models/Donation.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  
  // Donor Information
  donorName: {
    type: String,
    required: [true, 'Please provide donor name'],
    trim: true,
  },
  
  donorEmail: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true,
  },
  
  donorPhone: {
    type: String,
  },
  
  // Donation Details
  amount: {
    type: Number,
    required: [true, 'Please provide donation amount'],
    min: [1, 'Amount must be greater than 0'],
  },
  
  currency: {
    type: String,
    default: 'NGN',
  },
  
  purpose: {
    type: String,
    enum: ['Tithe', 'Offering', 'Building Fund', 'Missions', 'Special Project', 'Seed Offering', 'General', 'Other'],
    default: 'General',
  },
  
  customPurpose: {
    type: String,
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    enum: ['Paystack', 'Bank Transfer', 'Cash', 'Other'],
    default: 'Paystack',
  },
  
  paymentReference: {
    type: String,
    unique: true,
    sparse: true,
  },
  
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Successful', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  
  transactionId: {
    type: String,
  },
  
  // Donation Type
  recurring: {
    type: Boolean,
    default: false,
  },
  
  frequency: {
    type: String,
    enum: ['One-time', 'Weekly', 'Monthly', 'Yearly'],
    default: 'One-time',
  },
  
  // Anonymous donation
  anonymous: {
    type: Boolean,
    default: false,
  },
  
  // Receipt
  receiptSent: {
    type: Boolean,
    default: false,
  },
  
  receiptNumber: {
    type: String,
  },
  
  // Additional info
  message: {
    type: String,
  },
  
}, {
  timestamps: true,
});

// Generate receipt number before saving
donationSchema.pre('save', async function(next) {
  if (!this.receiptNumber && this.paymentStatus === 'Successful') {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.receiptNumber = `GRHCG-${year}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);