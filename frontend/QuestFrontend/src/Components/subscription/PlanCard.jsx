import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import SubscribeModal from './SubscribeModal';
import './Subscription.css';

const PlanCard = ({ plan, showButtonOnly = false }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();

  const handleSubscribe = () => {
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    setShowModal(true);
  };

  if (showButtonOnly) {
    return (
      <>
        <Button 
          variant="primary"
          size="sm"
          onClick={handleSubscribe}
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
      <Card className="subscription-card h-100 shadow-sm">
        <Card.Header className="bg-primary text-white text-center py-3 position-relative">
          <Card.Title className="mb-0">{plan.name}</Card.Title>
          {plan.isPopular && (
            <Badge 
              bg="warning" 
              text="dark" 
              className="position-absolute top-0 start-50 translate-middle rounded-pill"
            >
              Popular
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
              variant="primary"
              className="w-100"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
            
            {currentUser && (
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

export default PlanCard;