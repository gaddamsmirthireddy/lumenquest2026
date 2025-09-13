const SubscriptionPlan = require('../models/SubscriptionPlan');
const { createAuditLog } = require('../utils/auditLogger');

// Create a new discount for a plan
exports.createDiscount = async (req, res) => {
  try {
    const { planId } = req.params;
    const { percentage, validUntil, description } = req.body;

    // Validate discount percentage
    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        status: 'error',
        message: 'Discount percentage must be between 0 and 100'
      });
    }

    // Validate date
    const validUntilDate = new Date(validUntil);
    if (validUntilDate <= new Date()) {
      return res.status(400).json({
        status: 'error',
        message: 'Discount end date must be in the future'
      });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    const previousState = { ...plan.toObject() };

    plan.discount = {
      percentage,
      validUntil: validUntilDate,
      description
    };

    await plan.save();

    // Create audit log
    await createAuditLog({
      action: 'DISCOUNT_CREATE',
      performedBy: req.user._id,
      actionDetails: {
        planId,
        discount: plan.discount
      },
      entityType: 'PLAN',
      entityId: plan._id,
      previousState,
      newState: plan
    });

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update an existing discount
exports.updateDiscount = async (req, res) => {
  try {
    const { planId } = req.params;
    const { percentage, validUntil, description } = req.body;

    // Validate discount percentage
    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        status: 'error',
        message: 'Discount percentage must be between 0 and 100'
      });
    }

    // Validate date
    const validUntilDate = new Date(validUntil);
    if (validUntilDate <= new Date()) {
      return res.status(400).json({
        status: 'error',
        message: 'Discount end date must be in the future'
      });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    if (!plan.discount) {
      return res.status(404).json({
        status: 'error',
        message: 'No discount exists for this plan'
      });
    }

    const previousState = { ...plan.toObject() };

    plan.discount = {
      percentage,
      validUntil: validUntilDate,
      description
    };

    await plan.save();

    // Create audit log
    await createAuditLog({
      action: 'DISCOUNT_UPDATE',
      performedBy: req.user._id,
      actionDetails: {
        planId,
        discount: plan.discount
      },
      entityType: 'PLAN',
      entityId: plan._id,
      previousState,
      newState: plan
    });

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Remove a discount
exports.removeDiscount = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    if (!plan.discount) {
      return res.status(404).json({
        status: 'error',
        message: 'No discount exists for this plan'
      });
    }

    const previousState = { ...plan.toObject() };

    plan.discount = undefined;
    await plan.save();

    // Create audit log
    await createAuditLog({
      action: 'DISCOUNT_DELETE',
      performedBy: req.user._id,
      actionDetails: {
        planId
      },
      entityType: 'PLAN',
      entityId: plan._id,
      previousState,
      newState: plan
    });

    res.status(200).json({
      status: 'success',
      message: 'Discount removed successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all active discounts
exports.getActiveDiscounts = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({
      'discount.validUntil': { $gt: new Date() }
    });

    const activeDiscounts = plans.filter(plan => plan.discount);

    res.status(200).json({
      status: 'success',
      data: {
        discounts: activeDiscounts.map(plan => ({
          planId: plan._id,
          planName: plan.name,
          discount: plan.discount
        }))
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};