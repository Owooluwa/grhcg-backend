// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getFeaturedEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');

// GET /api/events/upcoming - Get upcoming events
router.get('/upcoming', getUpcomingEvents);

// GET /api/events/featured - Get featured events
router.get('/featured', getFeaturedEvents);

// POST /api/events - Create event
router.post('/', createEvent);

// GET /api/events - Get all events
router.get('/', getAllEvents);

// GET /api/events/:id - Get single event
router.get('/:id', getEventById);

// PUT /api/events/:id - Update event
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', deleteEvent);

// POST /api/events/:id/register - Register for event
router.post('/:id/register', registerForEvent);

module.exports = router;