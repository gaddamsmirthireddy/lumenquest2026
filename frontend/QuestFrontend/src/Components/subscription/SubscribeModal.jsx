import React, { useState } from 'react';
import { Modal, Button, Alert, Row, Col, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { subscriptionAPI } from '../../services/api';
import './Subscription.css';

const SubscribeModal = ({ show, handleClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('monthly');
  const { currentUser } = useAuth();

  const handleSubscribe = async () => {
    if (!currentUser) {
      setError('Please log in to subscribe');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const subscriptionData = {
        planId: plan._id,
        subscriptionType: selectedTerm,
        startDate: new Date().toISOString().split('T')[0]
      };
      
      await subscriptionAPI.subscribe(subscriptionData);
      setSuccess('Successfully subscribed to the plan!');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
        window.location.href = '/subscriptions';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (selectedTerm === 'yearly') {
      return (plan.price * 12 * 0.9).toFixed(2); // 10% discount for yearly
    }
    return plan.price;
  };

  const getTermText = () => {
    return selectedTerm === 'monthly' ? 'month' : 'year';
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-cart-plus me-2"></i>
          Subscribe to {plan.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="mb-3">
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
          </Alert>
        )}
        
        <Row>
          <Col md={6}>
            <div className="plan-details">
              <h5>Plan Details</h5>
              <ul className="list-unstyled">
                <li><strong>Name:</strong> {plan.name}</li>
                <li><strong>Monthly Price:</strong> ${plan.price}</li>
                <li><strong>Auto Renewal:</strong> {plan.autoRenewalAllowed ? 'Yes' : 'No'}</li>
                <li><strong>Status:</strong> {plan.status}</li>
              </ul>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="subscription-options">
              <h5>Subscription Options</h5>
              
              <div className="mb-3">
                <Form.Label>Subscription Term</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    id="monthly"
                    name="subscriptionTerm"
                    label={`Monthly - $${plan.price}/month`}
                    value="monthly"
                    checked={selectedTerm === 'monthly'}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  />
                  
                  <Form.Check
                    type="radio"
                    id="yearly"
                    name="subscriptionTerm"
                    label={`Yearly - $${(plan.price * 12 * 0.9).toFixed(2)}/year (Save 10%)`}
                    value="yearly"
                    checked={selectedTerm === 'yearly'}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="price-summary p-3 bg-light rounded">
                <h6>Order Summary</h6>
                <div className="d-flex justify-content-between">
                  <span>Plan price:</span>
                  <span>${plan.price}/{getTermText()}</span>
                </div>
                {selectedTerm === 'yearly' && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Yearly discount (10%):</span>
                    <span>-${(plan.price * 12 * 0.1).toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${calculateTotal()}/{getTermText()}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {!currentUser && (
          <Alert variant="warning" className="mt-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            You need to <a href="/login" className="alert-link">log in</a> or <a href="/register" className="alert-link">create an account</a> to subscribe.
          </Alert>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubscribe}
          disabled={loading || !currentUser}
        >
          {loading ? (
            <>S
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processing...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Confirm Subscription
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscribeModal;