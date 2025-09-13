const mongoose = require('mongoose');

const billingInformationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: {
      type: String,
      enum: ['credit_card', 'debit_card', 'bank_transfer'],
      required: true
    },
    lastFourDigits: String,
    expiryDate: Date
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

// Ensure user can only have one default billing information
billingInformationSchema.index({ user: 1, isDefault: 1 });

const BillingInformation = mongoose.model('BillingInformation', billingInformationSchema);
module.exports = BillingInformation;
