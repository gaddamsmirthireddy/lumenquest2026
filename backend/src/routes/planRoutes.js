const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { protect, restrictTo } = require('../middleware/auth');

// All routes are protected and restricted to admin
router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .post(planController.createPlan)
  .get(planController.getAllPlans);

router.route('/:id')
  .put(planController.updatePlan)
  .delete(planController.deletePlan);

router.post('/:id/discount', planController.addDiscount);

module.exports = router;