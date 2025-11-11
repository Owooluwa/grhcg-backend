// server.js

// STEP 1: Import all the tools we need
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// STEP 2: Load environment variables from .env file
dotenv.config();

// STEP 3: Connect to MongoDB database
connectDB();

// STEP 4: Create Express application
const app = express();

// STEP 5: Middleware Setup
// Allow frontend (different domain) to communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Allow server to read JSON data from requests
app.use(express.json());

// Allow server to read form data
app.use(express.urlencoded({ extended: true }));

// STEP 6: Test Route - to check if server is running
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🙏 Welcome to GRHCG Church API',
    status: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// STEP 7: Health Check Route - for monitoring
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// IMPORT ROUTES
const contactRoutes = require('./routes/contactRoutes');
const sermonRoutes = require('./routes/sermonRoutes');
const eventRoutes = require('./routes/eventRoutes');
const memberRoutes = require('./routes/memberRoutes');
const donationRoutes = require('./routes/donationRoutes');
const testimonyRoutes = require('./routes/testimonyRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// USE ROUTES
app.use('/api/contacts', contactRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/testimonies', testimonyRoutes);
app.use('/api/newsletter', newsletterRoutes);

// STEP 8: Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// STEP 9: Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// STEP 10: Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('=================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log('=================================');
});


// Export for Vercel
module.exports = app;
