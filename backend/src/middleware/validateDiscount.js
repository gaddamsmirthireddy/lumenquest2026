const { check, validationResult } = require('express-validator');

exports.validateDiscount = [
  check('percentage')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),
  
  check('validUntil')
    .isISO8601()
    .withMessage('Valid until must be a valid date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Valid until date must be in the future');
      }
      return true;
    }),
  
  check('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Description must be between 3 and 200 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }
    next();
  }
];