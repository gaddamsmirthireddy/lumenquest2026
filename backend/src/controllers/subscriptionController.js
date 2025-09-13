const SubscriptionPlan = require('../models/SubscriptionPlan');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const BillingInformation = require('../models/BillingInformation');

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

    // Find billing information (use provided ID or default)
    let billingInfo;
    if (billingInfoId) {
      billingInfo = await BillingInformation.findById(billingInfoId);
    } else {
      // Find user's default billing information
      billingInfo = await BillingInformation.findOne({ 
        user: userId, 
        isDefault: true 
      });
    }

    if (!billingInfo) {
      return res.status(400).json({
        status: 'error',
        message: 'No billing information found. Please add billing information first.'
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
      billingInfo: billingInfo._id
    });

    // Update user's active subscription
    await User.findByIdAndUpdate(userId, { activeSubscription: subscription._id });

    res.status(201).json({
      status: 'success',
      data: { subscription }
    });
  } catch (error) {
    console.error('Subscription error:', error);
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

// Upgrade subscription to a better plan
exports.upgradeSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    // Get current active subscription
    const currentSubscription = await Subscription.findOne({
      user: userId,
      status: 'active'
    }).populate('plan');

    if (!currentSubscription) {
      return res.status(404).json({
        status: 'error',
        message: 'No active subscription found to upgrade'
      });
    }

    // Get the new plan
    const newPlan = await SubscriptionPlan.findOne({ _id: planId, isActive: true });
    if (!newPlan) {
      return res.status(404).json({
        status: 'error',
        message: 'Target plan not found or inactive'
      });
    }

    // Check if it's actually an upgrade (higher price)
    if (newPlan.price <= currentSubscription.plan.price) {
      return res.status(400).json({
        status: 'error',
        message: 'Target plan must have a higher price than current plan for upgrade'
      });
    }

    // Find user's default billing information
    const billingInfo = await BillingInformation.findOne({ 
      user: userId, 
      isDefault: true 
    });

    if (!billingInfo) {
      return res.status(400).json({
        status: 'error',
        message: 'No billing information found'
      });
    }

    // Calculate prorated amount
    const currentPlanPrice = currentSubscription.plan.price;
    const newPlanPrice = newPlan.price;
    const daysRemaining = Math.ceil((currentSubscription.endDate - new Date()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((currentSubscription.endDate - currentSubscription.startDate) / (1000 * 60 * 60 * 24));
    
    const unusedAmount = (currentPlanPrice * daysRemaining) / totalDays;
    const upgradeCost = newPlanPrice - unusedAmount;

    // Calculate discount if applicable
    const discountedUpgradeCost = newPlan.discount && newPlan.discount.validUntil > new Date()
      ? upgradeCost * (1 - newPlan.discount.percentage / 100)
      : upgradeCost;

    // Cancel current subscription
    currentSubscription.status = 'cancelled';
    await currentSubscription.save();

    // Create new subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + newPlan.duration);

    const newSubscription = await Subscription.create({
      user: userId,
      plan: planId,
      startDate,
      endDate,
      status: 'active',
      autoRenew: true,
      paidAmount: discountedUpgradeCost,
      billingInfo: billingInfo._id
    });

    // Update user's active subscription
    await User.findByIdAndUpdate(userId, { activeSubscription: newSubscription._id });

    res.status(200).json({
      status: 'success',
      message: 'Subscription upgraded successfully',
      data: { 
        subscription: newSubscription,
        upgradeCost: discountedUpgradeCost,
        originalCost: upgradeCost
      }
    });
  } catch (error) {
    console.error('Upgrade error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error upgrading subscription'
    });
  }
};

// Downgrade subscription to a lower plan
exports.downgradeSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    // Get current active subscription
    const currentSubscription = await Subscription.findOne({
      user: userId,
      status: 'active'
    }).populate('plan');

    if (!currentSubscription) {
      return res.status(404).json({
        status: 'error',
        message: 'No active subscription found to downgrade'
      });
    }

    // Get the new plan
    const newPlan = await SubscriptionPlan.findOne({ _id: planId, isActive: true });
    if (!newPlan) {
      return res.status(404).json({
        status: 'error',
        message: 'Target plan not found or inactive'
      });
    }

    // Check if it's actually a downgrade (lower price)
    if (newPlan.price >= currentSubscription.plan.price) {
      return res.status(400).json({
        status: 'error',
        message: 'Target plan must have a lower price than current plan for downgrade'
      });
    }

    // Find user's default billing information
    const billingInfo = await BillingInformation.findOne({ 
      user: userId, 
      isDefault: true 
    });

    if (!billingInfo) {
      return res.status(400).json({
        status: 'error',
        message: 'No billing information found'
      });
    }

    // For downgrades, we'll start the new plan at the next billing cycle
    // Cancel current subscription at the end of current period
    currentSubscription.status = 'cancelled';
    currentSubscription.autoRenew = false;
    await currentSubscription.save();

    // Create new subscription starting from current end date
    const startDate = currentSubscription.endDate;
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + newPlan.duration);

    const newSubscription = await Subscription.create({
      user: userId,
      plan: planId,
      startDate,
      endDate,
      status: 'pending', // Will become active when current subscription ends
      autoRenew: true,
      paidAmount: newPlan.price,
      billingInfo: billingInfo._id
    });

    // Update user's active subscription (will be the pending one)
    await User.findByIdAndUpdate(userId, { activeSubscription: newSubscription._id });

    res.status(200).json({
      status: 'success',
      message: 'Subscription scheduled for downgrade',
      data: { 
        subscription: newSubscription,
        effectiveDate: startDate,
        currentSubscriptionEnd: currentSubscription.endDate
      }
    });
  } catch (error) {
    console.error('Downgrade error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error downgrading subscription'
    });
  }
};

// Get user's subscription history
exports.getSubscriptionHistory = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id
    })
    .populate('plan')
    .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: { subscriptions }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching subscription history'
    });
  }
};
