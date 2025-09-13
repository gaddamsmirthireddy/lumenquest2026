# LumenQuest API Documentation

## Base URL
```
http://localhost:5000
```

## Quick Start Guide

### Environment Variables
The backend requires these environment variables in `.env`:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
ADMIN_REGISTRATION_KEY=your_admin_key
MONGODB_URI=your_mongodb_connection_string
DB_NAME=lumenquest
NODE_ENV=development
```

### 1. Seed Database with Sample Data
First, populate the database with sample data:
```http
POST http://localhost:5000/api/seed/seed
Content-Type: application/json
```

### 2. Test Credentials
After seeding, use these credentials:
- **User**: john@example.com / password123
- **Admin**: admin@lumenquest.com / admin123

---

## Authentication Endpoints

### Auth Routes `/api/auth`

#### Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Register Admin User (Requires Admin Key)
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin",
  "adminKey": "80db6b0985043ff34191ce81c554d3bf8d902be3ceedaa2f8d18fa29ac4a616b"
}
```

**Note**: Admin registration requires a valid `adminKey` from the environment variables.

#### Login User
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": "68c510b280697d2e3d7635b5",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

## Subscription Plans `/api/subscriptions`

### Get All Plans (Public)
```http
GET http://localhost:5000/api/subscriptions/plans
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "plans": [
      {
        "_id": "68c510b180697d2e3d7635ad",
        "name": "Basic Plan",
        "description": "Perfect for individuals getting started",
        "price": 9.99,
        "duration": 1,
        "features": ["Feature 1", "Feature 2"],
        "discount": {
          "percentage": 10,
          "validUntil": "2025-10-13T06:35:25.822Z"
        }
      }
    ]
  }
}
```

### Subscribe to Plan (Protected)
```http
POST http://localhost:5000/api/subscriptions/subscribe
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "planId": "68c510b180697d2e3d7635ad"
}
```

### Get Active Subscription (Protected)
```http
GET http://localhost:5000/api/subscriptions/active
Authorization: Bearer <your_jwt_token>
```

### Cancel Subscription (Protected)
```http
POST http://localhost:5000/api/subscriptions/cancel
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

## Admin Routes `/api/admin`
All admin routes require authentication and admin role.

### User Management
```http
GET http://localhost:5000/api/admin/users
Authorization: Bearer <admin_jwt_token>
```

### System Statistics
```http
GET http://localhost:5000/api/admin/stats
Authorization: Bearer <admin_jwt_token>
```

---

## Plan Management `/api/plans`
All plan routes require authentication and admin role.

### Create New Plan
```http
POST http://localhost:5000/api/plans
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Premium Plan",
  "description": "Premium features access",
  "price": 99.99,
  "duration": 12,
  "features": ["Advanced analytics", "Priority support"]
}
```

### Get All Plans
```http
GET http://localhost:5000/api/plans
Authorization: Bearer <admin_jwt_token>
```

### Update Plan
```http
PUT http://localhost:5000/api/plans/:planId
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Updated Plan Name",
  "price": 79.99
}
```

### Delete Plan
```http
DELETE http://localhost:5000/api/plans/:planId
Authorization: Bearer <admin_jwt_token>
```

---

## Discount Management `/api/discounts`
All discount routes require authentication and admin role.

**Note**: There is no separate Discount model. Discounts are embedded in SubscriptionPlan model.

### Get All Active Discounts
```http
GET http://localhost:5000/api/discounts
Authorization: Bearer <admin_jwt_token>
```

### Create Discount for Plan
```http
POST http://localhost:5000/api/discounts/:planId
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "percentage": 20,
  "validUntil": "2025-12-31T23:59:59Z",
  "description": "Early Bird Discount"
}
```

### Update Existing Discount
```http
PUT http://localhost:5000/api/discounts/:planId
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "percentage": 25,
  "validUntil": "2025-12-31T23:59:59Z",
  "description": "Updated Early Bird Discount"
}
```

### Remove Discount
```http
DELETE http://localhost:5000/api/discounts/:planId
Authorization: Bearer <admin_jwt_token>
```

---

## Analytics `/api/analytics`
All analytics routes require authentication and admin role.

### Get Most Popular Plans
```http
GET http://localhost:5000/api/analytics/top-plans
Authorization: Bearer <admin_jwt_token>
```

### Get Subscription Trends
```http
GET http://localhost:5000/api/analytics/trends
Authorization: Bearer <admin_jwt_token>
```

---

## Postman Collection Setup

### Environment Variables
Create a Postman environment with these variables:
- `baseUrl`: `http://localhost:5000`
- `userToken`: (set after login)
- `adminToken`: (set after admin login)
- `planId`: (set after creating/getting plans)
- `userId`: (set after login)

### Test Flow for Postman

#### 1. Seed Database
```http
POST {{baseUrl}}/api/seed/seed
```

#### 2. Login as User
```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
**Save the token**: Set `userToken` = `{{token}}` from response

#### 2b. Register New Admin (Optional)
```http
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "admin123",
  "role": "admin",
  "adminKey": "80db6b0985043ff34191ce81c554d3bf8d902be3ceedaa2f8d18fa29ac4a616b"
}
```

#### 3. Login as Admin
```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "admin@lumenquest.com",
  "password": "admin123"
}
```
**Save the token**: Set `adminToken` = `{{token}}` from response

#### 4. Get Plans
```http
GET {{baseUrl}}/api/subscriptions/plans
```

#### 5. Subscribe to Plan (as User)
```http
POST {{baseUrl}}/api/subscriptions/subscribe
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
  "planId": "{{planId}}"
}
```

#### 6. Create Discount (as Admin)
```http
POST {{baseUrl}}/api/discounts/{{planId}}
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "percentage": 25,
  "validUntil": "2025-12-31T23:59:59Z",
  "description": "Holiday Special"
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "status": "error",
  "message": "Error description"
}
```

### Authentication Errors
```json
{
  "success": false,
  "error": "Not authorized, no token provided"
}
```

### Validation Errors
```json
{
  "status": "error",
  "message": "Discount percentage must be between 0 and 100"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Authentication

### JWT Token Usage
Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- Tokens expire after 7 days
- Get a new token by logging in again

### Role-Based Access
- **User Role**: Can access subscription endpoints
- **Admin Role**: Can access admin, plan management, and analytics endpoints

---

## Rate Limiting
- API requests are limited to 100 requests per 15 minutes per IP
- Excess requests will receive a `429 (Too Many Requests)` response

---

## Data Models

### User
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "activeSubscription": "subscription_id"
}
```

### SubscriptionPlan
```json
{
  "name": "Basic Plan",
  "description": "Perfect for individuals",
  "price": 9.99,
  "duration": 1,
  "features": ["Feature 1", "Feature 2"],
  "isActive": true,
  "discount": {
    "percentage": 10,
    "validUntil": "2025-10-13T06:35:25.822Z",
    "description": "Early Bird"
  }
}
```

### Subscription
```json
{
  "user": "user_id",
  "plan": "plan_id",
  "startDate": "2025-09-13T06:36:29.014Z",
  "endDate": "2025-10-13T06:36:29.014Z",
  "status": "active",
  "autoRenew": true,
  "paidAmount": 8.991,
  "billingInfo": "billing_info_id"
}
```

### BillingInformation
```json
{
  "user": "user_id",
  "name": "John Doe",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": {
    "type": "credit_card",
    "lastFourDigits": "1234",
    "expiryDate": "2025-12-31T00:00:00.000Z"
  },
  "isDefault": true
}
```

---

## Testing Checklist

### Basic Functionality
- [ ] Seed database with sample data
- [ ] Login as user
- [ ] Login as admin
- [ ] Get all subscription plans
- [ ] Subscribe to a plan
- [ ] Get active subscription
- [ ] Cancel subscription

### Admin Functionality
- [ ] Create new subscription plan
- [ ] Update existing plan
- [ ] Create discount for plan
- [ ] Update discount
- [ ] Remove discount
- [ ] Get system analytics

### Error Handling
- [ ] Test with invalid credentials
- [ ] Test with expired token
- [ ] Test with insufficient permissions
- [ ] Test with invalid data