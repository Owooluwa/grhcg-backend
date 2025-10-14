// routes/donationRoutes.js

const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  verifyPayment,
  getDonationStats
} = require('../controllers/donationController');

// GET /api/donations/stats - Get donation statistics
router.get('/stats', getDonationStats);

// POST /api/donations/verify - Verify payment
router.post('/verify', verifyPayment);

// POST /api/donations - Create donation
router.post('/', createDonation);

// GET /api/donations - Get all donations
router.get('/', getAllDonations);

// GET /api/donations/:id - Get single donation
router.get('/:id', getDonationById);

// PUT /api/donations/:id - Update donation
router.put('/:id', updateDonation);

// DELETE /api/donations/:id - Delete donation
router.delete('/:id', deleteDonation);

module.exports = router;