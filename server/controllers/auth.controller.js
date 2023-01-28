require('dotenv').config();

const bcrypt = require('bcryptjs'); // bcrypt for password-hashing
const jwt = require('jsonwebtoken'); // JWT

const User = require('../models/user.model');

// User signup
const signup = async (req, res) => {
  try {
    // Check if the user is already exist
    const result = await User.findOne({ emailAddress: req.body.emailAddress });
    if (!result) {
      // Hash the password
      req.body.password = await bcrypt.hash(req.body.password, 10);
      // Create a new user
      const user = await User.create(req.body);
      // send new user as response
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: 'This email is already in use' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User signin
const signin = async (req, res) => {
  try {
    // Check if the user is exist
    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (user) {
      // Check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // Sign the token and send it in response
        const token = await jwt.sign(
          {
            userId: user._id,
            firstName: user.firstName,
            emailAddress: user.emailAddress,
            role: user.role,
          },
          process.env.JWT_SECRET
        );
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Your password is invalid' });
      }
    } else {
      res.status(400).json({ error: 'No account found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, signin };
