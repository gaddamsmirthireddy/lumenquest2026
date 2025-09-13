# LumenQuest API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Auth Routes `/api/auth`
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login user | Public |

## Admin Routes `/api/admin`
All admin routes require authentication and admin role.

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | Get all users with subscription status |
| GET | `/admin/users/:userId` | Get detailed user information |
| PATCH | `/admin/users/:userId/role` | Update user role |

### Subscription Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/subscriptions/:userId/override` | Override subscription status |

### System Monitoring
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/stats` | Get system statistics |
| GET | `/admin/audit-logs` | Get system audit logs |

## Plan Management `/api/plans`
All plan routes require authentication and admin role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/plans` | Create new subscription plan |
| GET | `/plans` | List all plans |
| PUT | `/plans/:id` | Update plan |
| DELETE | `/plans/:id` | Delete plan |

## Discount Management `/api/discounts`
All discount routes require authentication and admin role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/discounts` | Get all active discounts |
| POST | `/discounts/:planId` | Create new discount for a plan |
| PUT | `/discounts/:planId` | Update existing discount |
| DELETE | `/discounts/:planId` | Remove discount |

## Subscription Management `/api/subscriptions`
All subscription routes require authentication.

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/subscriptions` | Subscribe to a plan | User |
| GET | `/subscriptions/user/:userId` | Get user subscriptions | User |
| PUT | `/subscriptions/:id/upgrade` | Upgrade subscription | User |
| PUT | `/subscriptions/:id/downgrade` | Downgrade subscription | User |
| PUT | `/subscriptions/:id/cancel` | Cancel subscription | User |
| PUT | `/subscriptions/:id/renew` | Renew subscription | User |

## Analytics `/api/analytics`
All analytics routes require authentication and admin role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/top-plans` | Get most popular plans |
| GET | `/analytics/active-vs-cancelled` | Get active vs cancelled subscriptions |
| GET | `/analytics/trends` | Get monthly subscription trends |

## Request/Response Examples

1. User Registration (Default user)
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}


👉 Creates a user with role user.

### 2. Admin Registration (Requires Secret Key)
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "admin",
  "adminKey": "super-secret-admin-key"
}

### 3. Create Subscription Plan
```http
POST /api/plans
{
  "name": "Premium Plan",
  "description": "Premium features access",
  "price": 99.99,
  "duration": 12,
  "features": ["Feature 1", "Feature 2"]
}
```

### 4. Add Discount
```http
POST /api/discounts/:planId
{
  "percentage": 20,
  "validUntil": "2025-12-31T23:59:59Z",
  "description": "Early Bird Discount"
}
```

### 5. Subscribe to Plan
```http
POST /api/subscriptions
{
  "planId": "plan_id",
  "billingInfoId": "billing_info_id"
}
```

## Error Responses
All endpoints follow a consistent error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication
Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Rate Limiting
- API requests are limited to 100 requests per 15 minutes per IP
- Excess requests will receive a 429 (Too Many Requests) response

## Data Models

### User
- name (String)
- email (String)
- password (String)
- role (String: 'user' or 'admin')
- activeSubscription (Reference to Subscription)

### SubscriptionPlan
- name (String)
- description (String)
- price (Number)
- duration (Number)
- features (Array)
- isActive (Boolean)
- discount (Object)
  - percentage (Number)
  - validUntil (Date)
  - description (String)

### Subscription
- user (Reference to User)
- plan (Reference to SubscriptionPlan)
- startDate (Date)
- endDate (Date)
- status (String: 'active', 'expired', 'cancelled')
- autoRenew (Boolean)
- paidAmount (Number)
- billingInfo (Reference to BillingInformation)

### AuditLog
- action (String)
- performedBy (Reference to User)
- actionDetails (Mixed)
- entityType (String)
- entityId (ObjectId)
- timestamp (Date)
- previousState (Mixed)
- newState (Mixed)