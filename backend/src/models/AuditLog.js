const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: [
      'PLAN_CREATE',
      'PLAN_UPDATE',
      'PLAN_DELETE',
      'SUBSCRIPTION_CREATE',
      'SUBSCRIPTION_UPGRADE',
      'SUBSCRIPTION_DOWNGRADE',
      'SUBSCRIPTION_CANCEL',
      'SUBSCRIPTION_RENEW',
      'DISCOUNT_CREATE',
      'DISCOUNT_UPDATE',
      'DISCOUNT_DELETE'
    ]
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  actionDetails: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  entityType: {
    type: String,
    required: true,
    enum: ['PLAN', 'SUBSCRIPTION', 'DISCOUNT']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  previousState: mongoose.Schema.Types.Mixed,
  newState: mongoose.Schema.Types.Mixed
});

// Indexes for faster querying
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ performedBy: 1, timestamp: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;