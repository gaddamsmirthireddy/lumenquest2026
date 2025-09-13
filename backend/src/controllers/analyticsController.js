const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

// Get most popular plans
exports.getTopPlans = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const startDate = new Date();
    
    if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const topPlans = await Subscription.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$plan',
          count: { $sum: 1 },
          revenue: { $sum: '$paidAmount' }
        }
      },
      {
        $lookup: {
          from: 'subscriptionplans',
          localField: '_id',
          foreignField: '_id',
          as: 'planDetails'
        }
      },
      {
        $unwind: '$planDetails'
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { topPlans }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get active vs cancelled subscriptions
exports.getActiveVsCancelled = async (req, res) => {
  try {
    const stats = await Subscription.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get monthly subscription trends
exports.getSubscriptionTrends = async (req, res) => {
  try {
    const trends = await Subscription.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          newSubscriptions: { $sum: 1 },
          totalRevenue: { $sum: '$paidAmount' }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { trends }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};