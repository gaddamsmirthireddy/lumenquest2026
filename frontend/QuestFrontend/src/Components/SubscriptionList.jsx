import React from 'react';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = ({ 
  subscriptions, 
  availablePlans, 
  onUpgrade, 
  onDowngrade, 
  onCancel, 
  onRenew 
}) => {
  if (subscriptions.length === 0) {
    return (
      <div className="alert alert-info">
        You don't have any subscriptions yet. Browse our plans to get started!
      </div>
    );
  }

  return (
    <div>
      <h3>Your Subscriptions</h3>
      {subscriptions.map(subscription => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          availablePlans={availablePlans}
          onUpgrade={onUpgrade}
          onDowngrade={onDowngrade}
          onCancel={onCancel}
          onRenew={onRenew}
        />
      ))}
    </div>
  );
};

export default SubscriptionList;