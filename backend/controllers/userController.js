const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Get All Users
// @route   GET /api/users
// @access  Private [role=manager]
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    debugger
    if (req.client.role === 'manager') {
      const users = await User.find();
      res.status(200).json({ success: true, data: users });
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    res.status(403).json({ success: false, error: err.message });
  }
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    fullName,
    email,
    role,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getMe,
}
