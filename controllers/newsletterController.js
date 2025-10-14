// controllers/newsletterController.js

const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.subscribed) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed'
        });
      } else {
        // Resubscribe
        subscriber.subscribed = true;
        subscriber.subscribedDate = Date.now();
        subscriber.unsubscribedDate = undefined;
        await subscriber.save();

        return res.status(200).json({
          success: true,
          message: 'Successfully resubscribed to newsletter!',
          data: subscriber
        });
      }
    }

    // Create new subscriber
    subscriber = await Newsletter.create({ email, name });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: subscriber
    });

  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe',
      error: error.message
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscriber list'
      });
    }

    if (!subscriber.subscribed) {
      return res.status(400).json({
        success: false,
        message: 'This email is already unsubscribed'
      });
    }

    subscriber.subscribed = false;
    subscriber.unsubscribedDate = Date.now();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe',
      error: error.message
    });
  }
};

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private (Admin only)
exports.getAllSubscribers = async (req, res) => {
  try {
    let query = {};
    
    // Filter by subscription status
    if (req.query.subscribed) {
      query.subscribed = req.query.subscribed === 'true';
    }

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedDate: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });

  } catch (error) {
    console.error('Error getting subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve subscribers',
      error: error.message
    });
  }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private (Admin only)
exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting subscriber:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscriber',
      error: error.message
    });
  }
};