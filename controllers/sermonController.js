// controllers/sermonController.js

const Sermon = require('../models/Sermon');

// @desc    Create new sermon
// @route   POST /api/sermons
// @access  Private (Admin only)
exports.createSermon = async (req, res) => {
  try {
    const sermonData = req.body;

    // Create sermon
    const sermon = await Sermon.create(sermonData);

    res.status(201).json({
      success: true,
      message: 'Sermon created successfully',
      data: sermon
    });

  } catch (error) {
    console.error('Error creating sermon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sermon',
      error: error.message
    });
  }
};

// @desc    Get all sermons
// @route   GET /api/sermons
// @access  Public
exports.getAllSermons = async (req, res) => {
  try {
    // Build query
    let query = { published: true };
    
    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by series if provided
    if (req.query.series) {
      query.series = req.query.series;
    }
    
    // Search by title or preacher
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { preacher: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Get sermons
    const sermons = await Sermon.find(query)
      .sort({ date: -1 }) // Newest first
      .limit(parseInt(req.query.limit) || 100);

    res.status(200).json({
      success: true,
      count: sermons.length,
      data: sermons
    });

  } catch (error) {
    console.error('Error getting sermons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sermons',
      error: error.message
    });
  }
};

// @desc    Get featured sermons
// @route   GET /api/sermons/featured
// @access  Public
exports.getFeaturedSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find({ featured: true, published: true })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: sermons.length,
      data: sermons
    });

  } catch (error) {
    console.error('Error getting featured sermons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured sermons',
      error: error.message
    });
  }
};

// @desc    Get single sermon
// @route   GET /api/sermons/:id
// @access  Public
exports.getSermonById = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: 'Sermon not found'
      });
    }

    // Increment views
    sermon.views += 1;
    await sermon.save();

    res.status(200).json({
      success: true,
      data: sermon
    });

  } catch (error) {
    console.error('Error getting sermon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve sermon',
      error: error.message
    });
  }
};

// @desc    Update sermon
// @route   PUT /api/sermons/:id
// @access  Private (Admin only)
exports.updateSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: 'Sermon not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sermon updated successfully',
      data: sermon
    });

  } catch (error) {
    console.error('Error updating sermon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update sermon',
      error: error.message
    });
  }
};

// @desc    Delete sermon
// @route   DELETE /api/sermons/:id
// @access  Private (Admin only)
exports.deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: 'Sermon not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sermon deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting sermon:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete sermon',
      error: error.message
    });
  }
};

// @desc    Increment sermon downloads
// @route   PUT /api/sermons/:id/download
// @access  Public
exports.incrementDownloads = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);

    if (!sermon) {
      return res.status(404).json({
        success: false,
        message: 'Sermon not found'
      });
    }

    sermon.downloads += 1;
    await sermon.save();

    res.status(200).json({
      success: true,
      message: 'Download count updated',
      downloads: sermon.downloads
    });

  } catch (error) {
    console.error('Error updating downloads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update download count',
      error: error.message
    });
  }
};