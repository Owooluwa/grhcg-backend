// models/Contact.js

const mongoose = require('mongoose');

// Define what a contact message looks like
const contactSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,  // Removes extra spaces
  },
  
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,  // Convert to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']  // Email validation
  },
  
  phone: {
    type: String,
    trim: true,
  },
  
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
  },
  
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    minlength: [10, 'Message must be at least 10 characters']
  },
  
  type: {
    type: String,
    enum: ['General Inquiry', 'Prayer Request', 'Counseling', 'Partnership', 'Other'],
    default: 'General Inquiry',
  },
  
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New',
  },
  
  responded: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,  // Adds createdAt and updatedAt automatically
});

// Export the model
module.exports = mongoose.model('Contact', contactSchema);