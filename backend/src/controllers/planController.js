const SubscriptionPlan = require('../models/SubscriptionPlan');
const { createAuditLog } = require('../utils/auditLogger');

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    
    // Create audit log
    await createAuditLog({
      action: 'PLAN_CREATE',
      performedBy: req.user._id,
      actionDetails: { planId: plan._id },
      entityType: 'PLAN',
      entityId: plan._id,
      newState: plan
    });

    res.status(201).json({
      status: 'success',
      data: { plan }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// List all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json({
      status: 'success',
      data: { plans }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update a plan
exports.updatePlan = async (req, res) => {
  try {
    const oldPlan = await SubscriptionPlan.findById(req.params.id);
    if (!oldPlan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Create audit log
    await createAuditLog({
      action: 'PLAN_UPDATE',
      performedBy: req.user._id,
      actionDetails: { planId: updatedPlan._id },
      entityType: 'PLAN',
      entityId: updatedPlan._id,
      previousState: oldPlan,
      newState: updatedPlan
    });

    res.status(200).json({
      status: 'success',
      data: { plan: updatedPlan }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    // Instead of actually deleting, mark as inactive
    plan.isActive = false;
    await plan.save();

    // Create audit log
    await createAuditLog({
      action: 'PLAN_DELETE',
      performedBy: req.user._id,
      actionDetails: { planId: plan._id },
      entityType: 'PLAN',
      entityId: plan._id,
      previousState: { ...plan.toObject(), isActive: true },
      newState: plan
    });

    res.status(200).json({
      status: 'success',
      message: 'Plan successfully deactivated'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add discount to a plan
exports.addDiscount = async (req, res) => {
  try {
    const { percentage, validUntil } = req.body;
    const plan = await SubscriptionPlan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Plan not found'
      });
    }

    const oldState = { ...plan.toObject() };
    
    plan.discount = {
      percentage,
      validUntil: new Date(validUntil)
    };
    
    await plan.save();

    // Create audit log
    await createAuditLog({
      action: 'DISCOUNT_CREATE',
      performedBy: req.user._id,
      actionDetails: { planId: plan._id, discount: plan.discount },
      entityType: 'PLAN',
      entityId: plan._id,
      previousState: oldState,
      newState: plan
    });

    res.status(200).json({
      status: 'success',
      data: { plan }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
