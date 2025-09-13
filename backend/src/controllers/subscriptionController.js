const SubscriptionPlan = require('../models/SubscriptionPlan');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Get all active subscription plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true });
    
    res.status(200).json({
      status: 'success',
      data: { plans }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching subscription plans'
    });
  }
};

// Subscribe to a plan
exports.subscribe = async (req, res) => {
  try {
    const { planId, billingInfoId } = req.body;
    const userId = req.user.id;

    // Check if plan exists and is active
    const plan = await SubscriptionPlan.findOne({ _id: planId, isActive: true });
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Subscription plan not found or inactive'
      });
    }

    // Calculate end date based on plan duration
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    // Calculate actual price after discount
    const discountedPrice = plan.discount && plan.discount.validUntil > new Date()
      ? plan.price * (1 - plan.discount.percentage / 100)
      : plan.price;

    // Create subscription
    const subscription = await Subscription.create({
      user: userId,
      plan: planId,
      startDate,
      endDate,
      paidAmount: discountedPrice,
      billingInfo: billingInfoId
    });

    // Update user's active subscription
    await User.findByIdAndUpdate(userId, { activeSubscription: subscription._id });

    res.status(201).json({
      status: 'success',
      data: { subscription }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating subscription'
    });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({
        status: 'error',
        message: 'No active subscription found'
      });
    }

    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    await subscription.save();

    // Remove active subscription from user
    await User.findByIdAndUpdate(req.user.id, { activeSubscription: null });

    res.status(200).json({
      status: 'success',
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error cancelling subscription'
    });
  }
};

// Get user's active subscription
exports.getActiveSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    }).populate('plan');

    if (!subscription) {
      return res.status(404).json({
        status: 'error',
        message: 'No active subscription found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { subscription }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching subscription'
    });
  }
};
