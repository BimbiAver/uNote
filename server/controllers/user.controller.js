const User = require('../models/user.model');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs'); // bcrypt for password-hashing

// Get all users
const getUsers = async (req, res) => {
  const { role } = req.user; // Fetch role from the req.user property initialized by auth middleware
  // Only admins can fetch all users
  if (role === 'admin') {
    // Fetch all users
    const users = await User.find({}).sort({ firstName: 1 });
    return res.status(200).json(users);
  }
  res.status(400).json({ error: 'Unauthorized access' });
};

// Get a specific user
const getUser = async (req, res) => {
  const { userId, role } = req.user; // Fetch userId & role from the req.user property initialized by auth middleware
  // Get ID from the request param
  const { id } = req.params;

  // Check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  // Only admins can fetch all users details
  if (userId === id || role === 'admin') {
    // Fetch the selected user
    const user = await User.findById(id);
    // Check if the user exists or not
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
    return res.status(200).json(user);
  }
  res.status(400).json({ error: 'Unauthorized access' });
};

// Create a new user
const createUser = async (req, res) => {
  const usrRole = req.user.role; // Fetch role from the req.user property initialized by auth middleware

  if (usrRole === 'admin') {
    // Fetch data from the request body
    const { firstName, lastName, emailAddress, password, role } = req.body;
    try {
      // Check if the user is already exist
      const result = await User.findOne({ emailAddress: emailAddress });
      if (!result) {
        // Add user
        const user = await User.create({
          firstName,
          lastName,
          emailAddress,
          password,
          role,
        });
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.status(400).json({ error: 'Unauthorized access' });
};

// Delete a user
const deleteUser = async (req, res) => {
  const usrRole = req.user.role; // Fetch role from the req.user property initialized by auth middleware

  // Get ID from the request param
  const { id } = req.params;

  if (usrRole === 'admin') {
    // Check if the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch the selected user
    const user = await User.findOneAndDelete({ _id: id });
    // Check if the user exists or not
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
    return res.status(200).json(user);
  }
  res.status(400).json({ error: 'Unauthorized access' });
};

// Update a user
const updateUser = async (req, res) => {
  const { userId, role } = req.user; // Fetch userId & role from the req.user property initialized by auth middleware

  // Get ID from the request param
  const { id } = req.params;

  // Check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  // Only admins can update all users' details
  if (userId === id || role === 'admin') {
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // Fetch the selected user
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
    // Check if the user exists or not
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
    return res.status(200).json(user);
  }
  res.status(400).json({ error: 'Unauthorized access' });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
