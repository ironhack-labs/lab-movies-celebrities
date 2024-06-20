// Routes (authRoutes.js)
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup'); // Render the sign-up view
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error', 'Username already exists');
      return res.redirect('/signup');
    }

    // Check if the email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash('error', 'Email address already exists');
      return res.redirect('/signup');
    }
    
    // Validate password length
    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters long');
      return res.redirect('/signup');
    }
    
    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      req.flash('error', 'Invalid email address');
      return res.redirect('/signup');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    
    req.flash('success', 'User created successfully');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred');
    res.redirect('/signup');
  }
});

module.exports = router;