const AuditLog = require('../models/AuditLog');

const createAuditLog = async ({
  action,
  performedBy,
  actionDetails,
  entityType,
  entityId,
  previousState = null,
  newState = null
}) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      actionDetails,
      entityType,
      entityId,
      previousState,
      newState
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw error to prevent disrupting main operation
  }
};

module.exports = { createAuditLog };