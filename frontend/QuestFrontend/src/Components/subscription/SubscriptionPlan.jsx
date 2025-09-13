import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import SubscribeModal from './SubscribeModal';
import './Subscription.css';

const PlanCard = ({ plan, showButtonOnly = false, onUpgrade }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useAuth();

  const handleSubscribe = () => {
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    setShowModal(true);
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade(plan);
    }
  };

  if (showButtonOnly) {
    return (
      <>
        <Button 
          variant="primary"
          size="sm"
          onClick={handleSubscribe}
          className="subscribe-btn"
        >
          Subscribe
        </Button>
        <SubscribeModal 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          plan={plan}
        />
      </>
    );
  }

  return (
    <>
      <Card 
        className={`subscription-card h-100 shadow-sm ${plan.isPopular ? 'popular-card' : ''} ${isHovered ? 'card-hover' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Header className={`card-header ${plan.isPopular ? 'bg-premium' : 'bg-primary'} text-white text-center py-3 position-relative`}>
          <Card.Title className="mb-0">{plan.name}</Card.Title>
          {plan.isPopular && (
            <Badge 
              bg="warning" 
              text="dark" 
              className="position-absolute top-0 start-50 translate-middle rounded-pill popular-badge"
            >
              Most Popular
            </Badge>
          )}
        </Card.Header>
        
        <Card.Body className="d-flex flex-column">
          <div className="text-center mb-3">
            <span className="h2 fw-bold text-primary">${plan.price}</span>
            <span className="text-muted">/month</span>
          </div>
          
          {plan.description && (
            <p className="text-center text-muted mb-4">{plan.description}</p>
          )}
          
          <ul className="list-unstyled mb-4 flex-grow-1">
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-arrow-repeat text-success me-2"></i>
              <span>Auto Renewal: <strong>{plan.autoRenewalAllowed ? 'Yes' : 'No'}</strong></span>
            </li>
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-circle-fill text-success me-2"></i>
              <span>Status: <strong>{plan.status}</strong></span>
            </li>
            {plan.features && plan.features.map((feature, index) => (
              <li key={index} className="mb-2 d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="text-center">
            <Button 
              variant={plan.isPopular ? "warning" : "primary"}
              className="w-100 subscribe-btn"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
            
            {onUpgrade && (
              <Button 
                variant="outline-primary"
                className="w-100 mt-2 upgrade-btn"
                onClick={handleUpgrade}
              >
                Upgrade Plan
              </Button>
            )}
            
            {currentUser && !onUpgrade && (
              <Button 
                variant="outline-primary"
                className="w-100 mt-2"
                onClick={() => setShowModal(true)}
              >
                View Details
              </Button>
            )}
          </div>
        </Card.Body>
        
        <Card.Footer className="text-muted text-center">
          Cancel anytime
        </Card.Footer>
      </Card>
      
      <SubscribeModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        plan={plan}
      />
    </>
  );
};

// New component for the upgrade view
const UpgradePlanView = ({ currentPlan, availablePlans, onSelectPlan, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleConfirmUpgrade = () => {
    if (selectedPlan) {
      onSelectPlan(selectedPlan);
    }
  };

  return (
    <div className="upgrade-plan-container">
      <div className="upgrade-header text-center mb-4">
        <h2>Upgrade Your Plan</h2>
        <p className="text-muted">Choose a plan that better fits your needs</p>
      </div>
      
      <Row className="justify-content-center">
        {availablePlans.map(plan => (
          <Col md={4} key={plan.id} className="mb-4">
            <div 
              className={`upgrade-plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''} ${plan.isPopular ? 'popular' : ''}`}
              onClick={() => handleSelectPlan(plan)}
            >
              <div className="plan-header">
                <h4>{plan.name}</h4>
                {plan.isPopular && <span className="popular-tag">Popular</span>}
              </div>
              
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">/month</span>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <div className="plan-action">
                {selectedPlan?.id === plan.id ? (
                  <Button variant="success" className="selected-btn">
                    Selected
                  </Button>
                ) : (
                  <Button variant="outline-primary">
                    Select Plan
                  </Button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      
      <div className="upgrade-actions text-center mt-4">
        <Button variant="primary" className="me-2" onClick={handleConfirmUpgrade} disabled={!selectedPlan}>
          Confirm Upgrade
        </Button>
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
export { UpgradePlanView };