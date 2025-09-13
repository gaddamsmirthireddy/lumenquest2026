const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.get('/plans', subscriptionController.getPlans);

// Protected routes
router.use(protect);
router.post('/subscribe', subscriptionController.subscribe);
router.post('/cancel', subscriptionController.cancelSubscription);
router.get('/active', subscriptionController.getActiveSubscription);

module.exports = router;