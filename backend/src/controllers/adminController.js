const User = require('../models/User');
const Subscription = require('../models/Subscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const { createAuditLog } = require('../utils/auditLogger');

// Get all users with their subscription status
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('activeSubscription');

    res.status(200).json({
      status: 'success',
      data: { users }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get user details with subscription history
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('-password')
      .populate('activeSubscription');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get subscription history
    const subscriptionHistory = await Subscription.find({ user: userId })
      .populate('plan')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: {
        user,
        subscriptionHistory
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role specified'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const previousState = { ...user.toObject() };
    user.role = role;
    await user.save();

    // Create audit log
    await createAuditLog({
      action: 'USER_ROLE_UPDATE',
      performedBy: req.user._id,
      actionDetails: {
        userId,
        oldRole: previousState.role,
        newRole: role
      },
      entityType: 'USER',
      entityId: user._id,
      previousState,
      newState: user
    });

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Manually override subscription status
exports.overrideSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const { subscriptionId, action } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        status: 'error',
        message: 'Subscription not found'
      });
    }

    const previousState = { ...subscription.toObject() };

    switch (action) {
      case 'activate':
        subscription.status = 'active';
        break;
      case 'deactivate':
        subscription.status = 'cancelled';
        break;
      case 'extend':
        const endDate = new Date(subscription.endDate);
        endDate.setMonth(endDate.getMonth() + 1);
        subscription.endDate = endDate;
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Invalid action specified'
        });
    }

    await subscription.save();

    // Create audit log
    await createAuditLog({
      action: 'SUBSCRIPTION_OVERRIDE',
      performedBy: req.user._id,
      actionDetails: {
        userId,
        subscriptionId,
        action
      },
      entityType: 'SUBSCRIPTION',
      entityId: subscription._id,
      previousState,
      newState: subscription
    });

    res.status(200).json({
      status: 'success',
      data: {
        subscription
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get system statistics
exports.getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const totalPlans = await SubscriptionPlan.countDocuments();
    
    // Get revenue statistics
    const revenue = await Subscription.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$paidAmount' },
          averageRevenue: { $avg: '$paidAmount' }
        }
      }
    ]);

    // Get plan distribution
    const planDistribution = await Subscription.aggregate([
      {
        $group: {
          _id: '$plan',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'subscriptionplans',
          localField: '_id',
          foreignField: '_id',
          as: 'planDetails'
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        activeSubscriptions,
        totalPlans,
        revenue: revenue[0] || { totalRevenue: 0, averageRevenue: 0 },
        planDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get audit logs
exports.getAuditLogs = async (req, res) => {
  try {
    const { startDate, endDate, action, entityType } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (action) {
      query.action = action;
    }

    if (entityType) {
      query.entityType = entityType;
    }

    const auditLogs = await AuditLog.find(query)
      .populate('performedBy', 'name email')
      .sort('-timestamp')
      .limit(100);

    res.status(200).json({
      status: 'success',
      data: {
        logs: auditLogs
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
