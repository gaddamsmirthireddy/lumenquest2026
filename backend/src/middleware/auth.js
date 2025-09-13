const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Security headers middleware
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

// Authentication middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in custom header (for demo purposes)
    if (!token && req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, no token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      // Add user info to request
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, invalid token'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error in authentication'
    });
  }
};

// Role-based access control middleware
const restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get user from JWT token (should be set by protect middleware)
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Fetch user from database to get current role
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: 'You do not have permission to perform this action'
        });
      }
      
      // Add user role to request for convenience
      req.user.role = user.role;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error checking user permissions'
      });
    }
  };
};

// Simple demo admin auth middleware (kept for backward compatibility)
const adminAuth = (req, res, next) => {
  // Check for a custom header sent from the frontend
  // Example: Frontend sets header 'x-user-role: admin' after login
  const isAdmin = req.headers['x-user-role'] === 'admin';

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized. Admin access required.'
    });
  }
  // If the header is present and correct, proceed to the controller
  next();
};

module.exports = { 
  protect, 
  restrictTo, 
  adminAuth, 
  apiLimiter, 
  securityHeaders 
};