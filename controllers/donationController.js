// controllers/donationController.js

const Donation = require('../models/Donation');

// @desc    Create new donation
// @route   POST /api/donations
// @access  Public
exports.createDonation = async (req, res) => {
  try {
    const donationData = req.body;

    const donation = await Donation.create(donationData);

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: donation
    });

  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record donation',
      error: error.message
    });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private (Admin only)
exports.getAllDonations = async (req, res) => {
  try {
    let query = {};
    
    // Filter by purpose
    if (req.query.purpose) {
      query.purpose = req.query.purpose;
    }
    
    // Filter by payment status
    if (req.query.status) {
      query.paymentStatus = req.query.status;
    }
    
    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const donations = await Donation.find(query)
      .sort({ createdAt: -1 });

    // Calculate total amount
    const totalAmount = donations.reduce((sum, donation) => {
      if (donation.paymentStatus === 'Successful') {
        return sum + donation.amount;
      }
      return sum;
    }, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount,
      data: donations
    });

  } catch (error) {
    console.error('Error getting donations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve donations',
      error: error.message
    });
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Private
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });

  } catch (error) {
    console.error('Error getting donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve donation',
      error: error.message
    });
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id
// @access  Private (Admin only)
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation updated successfully',
      data: donation
    });

  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation',
      error: error.message
    });
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private (Admin only)
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete donation',
      error: error.message
    });
  }
};

// @desc    Verify payment (Paystack webhook)
// @route   POST /api/donations/verify
// @access  Public
exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    // Find donation by reference
    const donation = await Donation.findOne({ paymentReference: reference });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Update payment status
    donation.paymentStatus = 'Successful';
    await donation.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: donation
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
};

// @desc    Get donation statistics
// @route   GET /api/donations/stats
// @access  Private (Admin only)
exports.getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $match: { paymentStatus: 'Successful' }
      },
      {
        $group: {
          _id: '$purpose',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    // Calculate overall total
    const overallTotal = stats.reduce((sum, stat) => sum + stat.total, 0);

    res.status(200).json({
      success: true,
      overallTotal,
      data: stats
    });

  } catch (error) {
    console.error('Error getting donation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve donation statistics',
      error: error.message
    });
  }
};