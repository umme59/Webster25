const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // <-- add this line
const User = require('../models/User');

// Generate unique JWT token each time
function generateToken(id) {
  return jwt.sign(
    {
      id,
      jti: uuidv4(), // unique token ID (different every time)
      iat: Math.floor(Date.now() / 1000) // issued-at time
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password required');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id) // new token each time
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id) // unique token each login
  });
});

// Get user profile
const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

module.exports = { registerUser, loginUser, getProfile };
