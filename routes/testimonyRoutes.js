// routes/testimonyRoutes.js

const express = require('express');
const router = express.Router();
const {
  createTestimony,
  getAllTestimonies,
  getFeaturedTestimonies,
  getTestimonyById,
  updateTestimony,
  deleteTestimony,
  approveTestimony,
  likeTestimony
} = require('../controllers/testimonyController');

// GET /api/testimonies/featured - Get featured testimonies
router.get('/featured', getFeaturedTestimonies);

// POST /api/testimonies - Submit testimony
router.post('/', createTestimony);

// GET /api/testimonies - Get all testimonies
router.get('/', getAllTestimonies);

// GET /api/testimonies/:id - Get single testimony
router.get('/:id', getTestimonyById);

// PUT /api/testimonies/:id - Update testimony
router.put('/:id', updateTestimony);

// DELETE /api/testimonies/:id - Delete testimony
router.delete('/:id', deleteTestimony);

// PUT /api/testimonies/:id/approve - Approve testimony
router.put('/:id/approve', approveTestimony);

// PUT /api/testimonies/:id/like - Like testimony
router.put('/:id/like', likeTestimony);

module.exports = router;