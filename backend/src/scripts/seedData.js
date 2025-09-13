const mongoose = require('mongoose');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lumenquest';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

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
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
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
      validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
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
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
    }
  },
  {
    name: 'Annual Basic',
    description: 'Basic plan with annual billing (2 months free)',
    price: 99.99,
    duration: 12,
    features: [
      'Access to basic quest templates',
      'Up to 5 personal quests',
      'Basic analytics',
      'Email support',
      'Annual billing discount'
    ],
    isActive: true
  },
  {
    name: 'Annual Pro',
    description: 'Pro plan with annual billing (3 months free)',
    price: 299.99,
    duration: 12,
    features: [
      'All Basic Plan features',
      'Unlimited personal quests',
      'Advanced analytics & insights',
      'Custom quest templates',
      'Priority support',
      'Team collaboration tools',
      'Annual billing discount'
    ],
    isActive: true
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
    name: 'Jane Smith',
    email: 'jane@example.com',
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

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await SubscriptionPlan.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert subscription plans
    const plans = await SubscriptionPlan.insertMany(samplePlans);
    console.log(`✅ Created ${plans.length} subscription plans`);
    
    // Insert users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );
    
    const users = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${users.length} test users`);
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Data Created:');
    console.log('Subscription Plans:');
    plans.forEach(plan => {
      const discount = plan.discount && plan.discount.percentage > 0 
        ? ` (${plan.discount.percentage}% off until ${plan.discount.validUntil.toLocaleDateString()})`
        : '';
      console.log(`  - ${plan.name}: $${plan.price}/${plan.duration === 1 ? 'month' : plan.duration + ' months'}${discount}`);
    });
    
    console.log('\nTest Users:');
    sampleUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    console.log('\n🔑 Test Credentials:');
    console.log('  User: john@example.com / password123');
    console.log('  Admin: admin@lumenquest.com / admin123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});
