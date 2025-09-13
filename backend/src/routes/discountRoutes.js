const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { protect, restrictTo } = require('../middleware/auth');

// All routes require authentication and admin privileges
router.use(protect);
router.use(restrictTo('admin'));

// Get all active discounts
router.get('/', discountController.getActiveDiscounts);

// Create a new discount for a plan
router.post('/:planId', discountController.createDiscount);

// Update an existing discount
router.put('/:planId', discountController.updateDiscount);

// Remove a discount
router.delete('/:planId', discountController.removeDiscount);

module.exports = router;