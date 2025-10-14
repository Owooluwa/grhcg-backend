// controllers/testimonyController.js

const Testimony = require('../models/Testimony');

// @desc    Submit new testimony
// @route   POST /api/testimonies
// @access  Public
exports.createTestimony = async (req, res) => {
  try {
    const testimonyData = req.body;

    const testimony = await Testimony.create(testimonyData);

    res.status(201).json({
      success: true,
      message: 'Thank you for sharing your testimony! It will be reviewed before publishing.',
      data: testimony
    });

  } catch (error) {
    console.error('Error creating testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit testimony',
      error: error.message
    });
  }
};

// @desc    Get all testimonies
// @route   GET /api/testimonies
// @access  Public (only published ones)
exports.getAllTestimonies = async (req, res) => {
  try {
    let query = { published: true, approved: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    const testimonies = await Testimony.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);

    res.status(200).json({
      success: true,
      count: testimonies.length,
      data: testimonies
    });

  } catch (error) {
    console.error('Error getting testimonies:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonies',
      error: error.message
    });
  }
};

// @desc    Get featured testimonies
// @route   GET /api/testimonies/featured
// @access  Public
exports.getFeaturedTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.find({
      featured: true,
      published: true,
      approved: true
    })
    .sort({ createdAt: -1 })
    .limit(5);

    res.status(200).json({
      success: true,
      count: testimonies.length,
      data: testimonies
    });

  } catch (error) {
    console.error('Error getting featured testimonies:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured testimonies',
      error: error.message
    });
  }
};

// @desc    Get single testimony
// @route   GET /api/testimonies/:id
// @access  Public
exports.getTestimonyById = async (req, res) => {
  try {
    const testimony = await Testimony.findById(req.params.id);

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: 'Testimony not found'
      });
    }

    // Increment views
    testimony.views += 1;
    await testimony.save();

    res.status(200).json({
      success: true,
      data: testimony
    });

  } catch (error) {
    console.error('Error getting testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimony',
      error: error.message
    });
  }
};

// @desc    Update testimony
// @route   PUT /api/testimonies/:id
// @access  Private (Admin only)
exports.updateTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: 'Testimony not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimony updated successfully',
      data: testimony
    });

  } catch (error) {
    console.error('Error updating testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update testimony',
      error: error.message
    });
  }
};

// @desc    Delete testimony
// @route   DELETE /api/testimonies/:id
// @access  Private (Admin only)
exports.deleteTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByIdAndDelete(req.params.id);

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: 'Testimony not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimony deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete testimony',
      error: error.message
    });
  }
};

// @desc    Approve testimony
// @route   PUT /api/testimonies/:id/approve
// @access  Private (Admin only)
exports.approveTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByIdAndUpdate(
      req.params.id,
      { approved: true, published: true },
      { new: true }
    );

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: 'Testimony not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimony approved and published successfully',
      data: testimony
    });

  } catch (error) {
    console.error('Error approving testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve testimony',
      error: error.message
    });
  }
};

// @desc    Like testimony
// @route   PUT /api/testimonies/:id/like
// @access  Public
exports.likeTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findById(req.params.id);

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: 'Testimony not found'
      });
    }

    testimony.likes += 1;
    await testimony.save();

    res.status(200).json({
      success: true,
      likes: testimony.likes
    });

  } catch (error) {
    console.error('Error liking testimony:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like testimony',
      error: error.message
    });
  }
};