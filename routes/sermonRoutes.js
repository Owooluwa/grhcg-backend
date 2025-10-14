// routes/sermonRoutes.js

const express = require('express');
const router = express.Router();
const {
  createSermon,
  getAllSermons,
  getFeaturedSermons,
  getSermonById,
  updateSermon,
  deleteSermon,
  incrementDownloads
} = require('../controllers/sermonController');

// GET /api/sermons/featured - Get featured sermons (must be before /:id)
router.get('/featured', getFeaturedSermons);

// POST /api/sermons - Create sermon
router.post('/', createSermon);

// GET /api/sermons - Get all sermons
router.get('/', getAllSermons);

// GET /api/sermons/:id - Get single sermon
router.get('/:id', getSermonById);

// PUT /api/sermons/:id - Update sermon
router.put('/:id', updateSermon);

// DELETE /api/sermons/:id - Delete sermon
router.delete('/:id', deleteSermon);

// PUT /api/sermons/:id/download - Increment downloads
router.put('/:id/download', incrementDownloads);

module.exports = router;