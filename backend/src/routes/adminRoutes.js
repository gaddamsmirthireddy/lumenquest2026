const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

// Protect all admin routes
router.use(protect);
router.use(restrictTo('admin'));

// User management routes
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.patch('/users/:userId/role', adminController.updateUserRole);

// Subscription management routes
router.post('/subscriptions/:userId/override', adminController.overrideSubscription);

// System statistics and monitoring
router.get('/stats', adminController.getSystemStats);
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;