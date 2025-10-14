// routes/newsletterRoutes.js

const express = require('express');
const router = express.Router();
const {
  subscribe,
  unsubscribe,
  getAllSubscribers,
  deleteSubscriber
} = require('../controllers/newsletterController');

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', subscribe);

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribe);

// GET /api/newsletter - Get all subscribers
router.get('/', getAllSubscribers);

// DELETE /api/newsletter/:id - Delete subscriber
router.delete('/:id', deleteSubscriber);

module.exports = router;