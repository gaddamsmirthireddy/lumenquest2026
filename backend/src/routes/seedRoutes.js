const express = require('express');
const router = express.Router();
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');
const BillingInformation = require('../models/BillingInformation');
const bcrypt = require('bcryptjs');

// Sample subscription plans
const samplePlans = [
  {
    name: 'Basic Plan',
    description: 'Perfect for individuals getting started with LumenQuest',
    price: 9.99,
    duration: 1,
    features: [
      'Access to basic quest templates',
      'Up to 5 personal quests',
      'Basic analytics',
      'Email support'
    ],
    isActive: true,
    discount: {
      percentage: 10,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  },
  {
    name: 'Pro Plan',
    description: 'Advanced features for serious quest creators',
    price: 29.99,
    duration: 1,
    features: [
      'All Basic Plan features',
      'Unlimited personal quests',
      'Advanced analytics & insights',
      'Custom quest templates',
      'Priority support',
      'Team collaboration tools'
    ],
    isActive: true,
    discount: {
      percentage: 15,
      validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
    }
  },
  {
    name: 'Enterprise Plan',
    description: 'Full-featured solution for organizations',
    price: 99.99,
    duration: 1,
    features: [
      'All Pro Plan features',
      'Advanced team management',
      'Custom integrations',
      'API access',
      'White-label options',
      '24/7 phone support',
      'Custom onboarding'
    ],
    isActive: true,
    discount: {
      percentage: 20,
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    }
  }
];

// Sample test users
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Admin User',
    email: 'admin@lumenquest.com',
    password: 'admin123',
    role: 'admin'
  }
];

// Seed database endpoint
router.post('/seed', async (req, res) => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data (optional - you can remove this if you want to keep existing data)
    await SubscriptionPlan.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert subscription plans
    const plans = await SubscriptionPlan.insertMany(samplePlans);
    console.log(`Created ${plans.length} subscription plans`);
    
    // Insert users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );
    
    const users = await User.insertMany(hashedUsers);
    console.log(`Created ${users.length} test users`);
    
    // Create sample billing information for John Doe
    const johnUser = users.find(u => u.email === 'john@example.com');
    if (johnUser) {
      const billingInfo = await BillingInformation.create({
        user: johnUser._id,
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA'
        },
        paymentMethod: {
          type: 'credit_card',
          lastFourDigits: '1234',
          expiryDate: new Date('2025-12-31')
        },
        isDefault: true
      });
      console.log(`Created billing information for ${johnUser.name}`);
    }
    
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        plansCreated: plans.length,
        usersCreated: users.length,
        plans: plans.map(plan => ({
          id: plan._id,
          name: plan.name,
          price: plan.price,
          features: plan.features
        })),
        users: users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }))
      }
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

module.exports = router;
