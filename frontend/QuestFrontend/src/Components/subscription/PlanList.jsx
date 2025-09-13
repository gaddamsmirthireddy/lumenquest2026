import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Alert, Spinner, Table } from 'react-bootstrap';
import { subscriptionAPI } from '../../services/api';
import PlanCard from './PlanCard';
import './Subscription.css';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await subscriptionAPI.getPlans();
        setPlans(response.data);
        setFilteredPlans(response.data);
      } catch (err) {
        setError('Failed to fetch plans');
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    let result = plans;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(plan => plan.status === filterStatus);
    }
    
    // Sort plans
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    setFilteredPlans(result);
  }, [plans, searchTerm, sortBy, filterStatus]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="display-5 fw-bold text-primary">Available Subscription Plans</h1>
          <p className="lead">Choose the plan that best fits your needs</p>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3} className="mb-3">
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </Form.Select>
        </Col>
        
        <Col md={3} className="mb-3">
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
      </Row>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <h3 className="text-muted mt-3">No plans found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <Row>
          {filteredPlans.map(plan => (
            <Col key={plan._id} xl={4} lg={6} md={6} className="mb-4">
              <PlanCard plan={plan} />
            </Col>
          ))}
        </Row>
      )}

      {/* Plan comparison table for larger screens */}
      <Row className="mt-5 d-none d-lg-block">
        <Col xs={12}>
          <h3 className="mb-4">Plan Comparison</h3>
          <div className="table-responsive">
            <Table bordered hover>
              <thead className="table-light">
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Auto Renewal</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.slice(0, 5).map(plan => (
                  <tr key={plan._id}>
                    <td>{plan.name}</td>
                    <td>${plan.price}/month</td>
                    <td>
                      <span className={`badge ${plan.autoRenewalAllowed ? 'bg-success' : 'bg-secondary'}`}>
                        {plan.autoRenewalAllowed ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${plan.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>
                      <PlanCard plan={plan} showButtonOnly={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanList;