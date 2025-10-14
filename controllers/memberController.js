// controllers/memberController.js

const Member = require('../models/Member');

// @desc    Register new member
// @route   POST /api/members
// @access  Public
exports.registerMember = async (req, res) => {
  try {
    const memberData = req.body;

    // Check if email already exists
    const existingMember = await Member.findOne({ email: memberData.email });
    
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'A member with this email already exists'
      });
    }

    const member = await Member.create(memberData);

    res.status(201).json({
      success: true,
      message: 'Thank you for registering! Your membership is pending approval.',
      data: member
    });

  } catch (error) {
    console.error('Error registering member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register member',
      error: error.message
    });
  }
};

// @desc    Get all members
// @route   GET /api/members
// @access  Private (Admin only)
exports.getAllMembers = async (req, res) => {
  try {
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by membership type
    if (req.query.type) {
      query.membershipType = req.query.type;
    }

    const members = await Member.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });

  } catch (error) {
    console.error('Error getting members:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve members',
      error: error.message
    });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });

  } catch (error) {
    console.error('Error getting member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve member',
      error: error.message
    });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private (Admin only)
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Member updated successfully',
      data: member
    });

  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update member',
      error: error.message
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private (Admin only)
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete member',
      error: error.message
    });
  }
};

// @desc    Approve member
// @route   PUT /api/members/:id/approve
// @access  Private (Admin only)
exports.approveMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'Active' },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Member approved successfully',
      data: member
    });

  } catch (error) {
    console.error('Error approving member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve member',
      error: error.message
    });
  }
};