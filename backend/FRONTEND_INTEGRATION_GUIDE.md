# Frontend Integration Guide - LumenQuest API

## Base Configuration

### API Base URL
```
http://localhost:5000/api
```

### Authentication Headers
```javascript
// Include in all authenticated requests
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Environment Variables for Frontend

Create these environment variables in your frontend:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_FULL_URL=http://localhost:5000
```

---

## Authentication Endpoints

### 1. User Registration
```javascript
const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
  });
  return response.json();
};

// Response:
// {
//   "status": "success",
//   "token": "jwt_token_here",
//   "data": {
//     "user": {
//       "id": "user_id",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "role": "user"
//     }
//   }
// }
```

### 2. Admin Registration
```javascript
const registerAdmin = async (adminData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: adminData.name,
      email: adminData.email,
      password: adminData.password,
      role: 'admin',
      adminKey: '80db6b0985043ff34191ce81c554d3bf8d902be3ceedaa2f8d18fa29ac4a616b'
    })
  });
  return response.json();
};
```

### 3. User Login
```javascript
const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password
    })
  });
  return response.json();
};

// Response:
// {
//   "status": "success",
//   "token": "jwt_token_here",
//   "data": {
//     "user": {
//       "id": "user_id",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "role": "user"
//     }
//   }
// }
```

---

## Subscription Plans (Public)

### 1. Get All Available Plans
```javascript
const getSubscriptionPlans = async () => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/plans`);
  return response.json();
};

// Response:
// {
//   "status": "success",
//   "data": {
//     "plans": [
//       {
//         "_id": "plan_id",
//         "name": "Basic Plan",
//         "description": "Perfect for individuals",
//         "price": 9.99,
//         "duration": 1,
//         "features": ["Feature 1", "Feature 2"],
//         "discount": {
//           "percentage": 10,
//           "validUntil": "2025-10-13T06:35:25.822Z"
//         }
//       }
//     ]
//   }
// }
```

---

## User Subscription Management (Protected)

### 1. Subscribe to a Plan
```javascript
const subscribeToPlan = async (planId, token) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/subscribe`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      planId: planId
    })
  });
  return response.json();
};

// Response:
// {
//   "status": "success",
//   "data": {
//     "subscription": {
//       "user": "user_id",
//       "plan": "plan_id",
//       "startDate": "2025-09-13T06:36:29.014Z",
//       "endDate": "2025-10-13T06:36:29.014Z",
//       "status": "active",
//       "autoRenew": true,
//       "paidAmount": 8.991,
//       "billingInfo": "billing_info_id"
//     }
//   }
// }
```

### 2. Get Active Subscription
```javascript
const getActiveSubscription = async (token) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/active`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// Response:
// {
//   "status": "success",
//   "data": {
//     "subscription": {
//       "_id": "subscription_id",
//       "user": "user_id",
//       "plan": {
//         "_id": "plan_id",
//         "name": "Basic Plan",
//         "description": "Perfect for individuals",
//         "price": 9.99,
//         "features": ["Feature 1", "Feature 2"],
//         "discount": { "percentage": 10 }
//       },
//       "startDate": "2025-09-13T06:36:29.014Z",
//       "endDate": "2025-10-13T06:36:29.014Z",
//       "status": "active",
//       "paidAmount": 8.991
//     }
//   }
// }
```

### 3. Cancel Subscription
```javascript
const cancelSubscription = async (token) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
```

---

## Admin Management (Admin Only)

### 1. Get All Active Discounts
```javascript
const getActiveDiscounts = async (adminToken) => {
  const response = await fetch(`${API_BASE_URL}/discounts`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
```

### 2. Create Discount for Plan
```javascript
const createDiscount = async (planId, discountData, adminToken) => {
  const response = await fetch(`${API_BASE_URL}/discounts/${planId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      percentage: discountData.percentage,
      validUntil: discountData.validUntil,
      description: discountData.description
    })
  });
  return response.json();
};
```

### 3. Update Discount
```javascript
const updateDiscount = async (planId, discountData, adminToken) => {
  const response = await fetch(`${API_BASE_URL}/discounts/${planId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      percentage: discountData.percentage,
      validUntil: discountData.validUntil,
      description: discountData.description
    })
  });
  return response.json();
};
```

### 4. Remove Discount
```javascript
const removeDiscount = async (planId, adminToken) => {
  const response = await fetch(`${API_BASE_URL}/discounts/${planId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
```

---

## Error Handling

### Standard Error Response Format
```javascript
// All errors follow this format:
{
  "status": "error",
  "message": "Error description"
}

// Authentication errors:
{
  "success": false,
  "error": "Not authorized, no token provided"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden (Insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

### Error Handling Example
```javascript
const handleApiCall = async (apiFunction) => {
  try {
    const response = await apiFunction();
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
```

---

## Token Management

### Storing and Using Tokens
```javascript
// Store token after login
localStorage.setItem('authToken', token);

// Retrieve token for API calls
const token = localStorage.getItem('authToken');

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  try {
    // Check if token is expired (optional)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// Logout (clear token)
const logout = () => {
  localStorage.removeItem('authToken');
  // Redirect to login page
};
```

---

## Sample React Hooks

### Authentication Hook
```javascript
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    if (response.status === 'success') {
      setToken(response.token);
      setUser(response.data.user);
      localStorage.setItem('authToken', response.token);
      return response;
    }
    throw new Error(response.message);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return { user, token, login, logout, loading };
};
```

### Subscription Hook
```javascript
export const useSubscriptions = (token) => {
  const [plans, setPlans] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await getSubscriptionPlans();
      setPlans(response.data.plans);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId) => {
    try {
      const response = await subscribeToPlan(planId, token);
      if (response.status === 'success') {
        setActiveSubscription(response.data.subscription);
      }
      return response;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw error;
    }
  };

  const fetchActiveSubscription = async () => {
    if (!token) return;
    
    try {
      const response = await getActiveSubscription(token);
      if (response.status === 'success') {
        setActiveSubscription(response.data.subscription);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    }
  };

  return {
    plans,
    activeSubscription,
    loading,
    fetchPlans,
    subscribe,
    fetchActiveSubscription
  };
};
```

---

## Testing Credentials

### Development Test Users
```javascript
const testUsers = {
  regular: {
    email: 'john@example.com',
    password: 'password123'
  },
  admin: {
    email: 'admin@lumenquest.com',
    password: 'admin123'
  }
};
```

### Sample Plan Data Structure
```javascript
const samplePlan = {
  _id: "plan_id",
  name: "Basic Plan",
  description: "Perfect for individuals getting started",
  price: 9.99,
  duration: 1,
  features: [
    "Access to basic quest templates",
    "Up to 5 personal quests",
    "Basic analytics",
    "Email support"
  ],
  discount: {
    percentage: 10,
    validUntil: "2025-10-13T06:35:25.822Z",
    description: "Early Bird Discount"
  }
};
```

---

## Quick Start Checklist for Frontend Team

1. **Setup Environment Variables**
   - [ ] Add `REACT_APP_API_BASE_URL=http://localhost:5000/api`
   - [ ] Add `REACT_APP_API_FULL_URL=http://localhost:5000`

2. **Authentication Flow**
   - [ ] Implement login/register forms
   - [ ] Store JWT token in localStorage
   - [ ] Add token to all authenticated requests
   - [ ] Handle token expiration

3. **Subscription Flow**
   - [ ] Display available plans
   - [ ] Show discount information
   - [ ] Implement subscription purchase
   - [ ] Display active subscription status

4. **Admin Features (if needed)**
   - [ ] Admin login with role check
   - [ ] Discount management interface
   - [ ] User management (if required)

5. **Error Handling**
   - [ ] Implement global error handler
   - [ ] Show user-friendly error messages
   - [ ] Handle network failures gracefully

---

## Contact & Support

For any API-related questions or issues, refer to:
- **API Documentation**: `backend/API_DOCUMENTATION.md`
- **Backend Repository**: Current backend codebase
- **Test Endpoints**: Use Postman collection from documentation

**Backend Status**: ✅ Fully functional with sample data
**Database**: ✅ Connected and seeded
**Authentication**: ✅ JWT-based with role management
**Admin Features**: ✅ Complete with secret key validation
