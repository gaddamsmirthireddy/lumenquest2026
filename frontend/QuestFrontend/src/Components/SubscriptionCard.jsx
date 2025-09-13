import React, { useState } from 'react';

const SubscriptionCard = ({ subscription, availablePlans, onUpgrade, onDowngrade, onCancel, onRenew }) => {
  const [showActions, setShowActions] = useState(false);
  
  // Find the current plan details
  const currentPlan = availablePlans.find(plan => plan.id === subscription.planId);
  
  // Filter available plans for upgrade/downgrade options
  const upgradeOptions = availablePlans.filter(
    plan => plan.price > currentPlan.price && plan.type === currentPlan.type
  );
  
  const downgradeOptions = availablePlans.filter(
    plan => plan.price < currentPlan.price && plan.type === currentPlan.type
  );

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel your ${currentPlan.name} subscription?`)) {
      onCancel(subscription.id);
    }
  };

  const handleRenew = () => {
    onRenew(subscription.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{currentPlan?.name || 'Unknown Plan'}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{currentPlan?.type || 'N/A'}</h6>
            <p className="card-text">
              <strong>Price:</strong> ${currentPlan?.price}/month<br />
              <strong>Data:</strong> {currentPlan?.dataQuota} GB<br />
              <strong>Status:</strong> <span className={`badge ${subscription.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                {subscription.status}
              </span><br />
              <strong>Renewal Date:</strong> {new Date(subscription.renewalDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <button 
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setShowActions(!showActions)}
            >
              {showActions ? 'Hide Actions' : 'Manage'}
            </button>
          </div>
        </div>

        {showActions && (
          <div className="mt-3">
            <div className="d-flex flex-wrap gap-2">
              {/* Upgrade Button */}
              {upgradeOptions.length > 0 && (
                <div className="dropdown">
                  <button 
                    className="btn btn-success btn-sm dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    Upgrade Plan
                  </button>
                  <ul className="dropdown-menu">
                    {upgradeOptions.map(plan => (
                      <li key={plan.id}>
                        <button 
                          className="dropdown-item" 
                          onClick={() => onUpgrade(subscription.id, plan.id)}
                        >
                          {plan.name} (${plan.price}/month)
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Downgrade Button */}
              {downgradeOptions.length > 0 && (
                <div className="dropdown">
                  <button 
                    className="btn btn-warning btn-sm dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    Downgrade Plan
                  </button>
                  <ul className="dropdown-menu">
                    {downgradeOptions.map(plan => (
                      <li key={plan.id}>
                        <button 
                          className="dropdown-item" 
                          onClick={() => onDowngrade(subscription.id, plan.id)}
                        >
                          {plan.name} (${plan.price}/month)
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Renew Button */}
              {subscription.status === 'pending renewal' && (
                <button 
                  className="btn btn-info btn-sm"
                  onClick={handleRenew}
                >
                  Renew Now
                </button>
              )}

              {/* Cancel Button */}
              {subscription.status === 'active' && (
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleCancel}
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;