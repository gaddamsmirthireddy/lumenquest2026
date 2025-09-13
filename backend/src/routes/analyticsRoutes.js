const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, restrictTo } = require('../middleware/auth');

// All routes are protected and restricted to admin
router.use(protect);
router.use(restrictTo('admin'));

router.get('/top-plans', analyticsController.getTopPlans);
router.get('/active-vs-cancelled', analyticsController.getActiveVsCancelled);
router.get('/trends', analyticsController.getSubscriptionTrends);

module.exports = router;