// routes/memberRoutes.js

const express = require('express');
const router = express.Router();
const {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  approveMember
} = require('../controllers/memberController');

// POST /api/members - Register new member
router.post('/', registerMember);

// GET /api/members - Get all members
router.get('/', getAllMembers);

// GET /api/members/:id - Get single member
router.get('/:id', getMemberById);

// PUT /api/members/:id - Update member
router.put('/:id', updateMember);


// DELETE /api/members/:id - Delete member
router.delete('/:id', deleteMember);

// PUT /api/members/:id/approve - Approve member
router.put('/:id/approve', approveMember);

module.exports = router;