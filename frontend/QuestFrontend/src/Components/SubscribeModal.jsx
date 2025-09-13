import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const SubscriptionPlans = ({ plans }) => {
  const { currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    if (!currentUser) return window.location.href = '/login';
    setSelectedPlan(plan);
  };

  const closeModal = () => setSelectedPlan(null);

  const subscribe = () => {
    alert(`Subscribed to ${selectedPlan.name}!`);
    closeModal();
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '20px',
    minWidth: '200px',
    textAlign: 'center',
    color: '#fff',
    margin: '10px',
    flex: 1
  };

  const planColors = {
    Basic: '#6c757d',
    Premium: '#007bff',
    Ultra: '#fd7e14'
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ ...cardStyle, backgroundColor: planColors[plan.name] || '#343a40' }}>
            <h3>{plan.name}</h3>
            <h2>${plan.price}/mo</h2>
            {plan.features?.map((f, i) => <p key={i}>{f}</p>)}
            <Button 
              style={{ marginTop: 'auto' }}
              onClick={() => handleSubscribe(plan)}
              variant="light"
            >
              Subscribe
            </Button>
          </div>
        ))}
      </div>

      <Modal show={!!selectedPlan} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to {selectedPlan?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Price: ${selectedPlan?.price}/month</p>
          <ul>
            {selectedPlan?.features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" onClick={subscribe}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionPlans;
