import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PlanCard, { UpgradePlanView } from '../components/PlanCard';

const SubscriptionPage = () => {
  const [view, setView] = useState('plans'); // 'plans' or 'upgrade'
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null);

  // Sample plans data
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 9.99,
      description: "Perfect for getting started",
      autoRenewalAllowed: true,
      status: "Active",
      features: ["10 discount alerts per month", "Basic notifications", "Email support"],
      isPopular: false
    },
    {
      id: 2,
      name: "Pro",
      price: 19.99,
      description: "For power users",
      autoRenewalAllowed: true,
      status: "Inactive",
      features: ["Unlimited discount alerts", "Push notifications", "Priority support", "Advanced filters"],
      isPopular: true
    },
    {
      id: 3,
      name: "Enterprise",
      price: 49.99,
      description: "For businesses",
      autoRenewalAllowed: true,
      status: "Inactive",
      features: ["Unlimited everything", "Custom integrations", "Dedicated account manager", "API access"],
      isPopular: false
    }
  ];

  const handleUpgrade = (plan) => {
    setCurrentPlan(plans[0]); // Assuming first plan is current
    setSelectedUpgradePlan(plan);
    setView('upgrade');
  };

  const handleSelectUpgradePlan = (plan) => {
    // Handle the upgrade logic here
    console.log("Upgrading to:", plan);
    // You would typically integrate with your payment system here
    setView('plans');
  };

  const handleCancelUpgrade = () => {
    setView('plans');
  };

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Choose Your Plan</h1>
        <p className="lead text-muted">
          Select the perfect plan for your discount tracking needs
        </p>
      </div>

      {view === 'plans' ? (
        <Row className="g-4">
          {plans.map(plan => (
            <Col key={plan.id} md={4}>
              <PlanCard 
                plan={plan} 
                onUpgrade={plan.id !== 1 ? () => handleUpgrade(plan) : null}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <UpgradePlanView
          currentPlan={currentPlan}
          availablePlans={plans.filter(plan => plan.id !== currentPlan?.id)}
          onSelectPlan={handleSelectUpgradePlan}
          onCancel={handleCancelUpgrade}
        />
      )}
    </Container>
  );
};

export default SubscriptionPage;