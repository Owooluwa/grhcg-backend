// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// POST /api/contacts - Submit contact form
router.post('/', createContact);

// GET /api/contacts - Get all contacts
router.get('/', getAllContacts);

// GET /api/contacts/:id - Get single contact
router.get('/:id', getContactById);

// PUT /api/contacts/:id - Update contact
router.put('/:id', updateContact);

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', deleteContact);

module.exports = router;