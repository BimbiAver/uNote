const User = require('../models/user.model');
const mongoose = require('mongoose');

// Get all users
const getUsers = async (req, res) => {
    // Fetch all users
    const users = await User.find({}).sort({ firstName: 1 });
    res.status(200).json(users);
};

// Get a specific user
const getUser = async (req, res) => {
    // Get ID from the request param
    const { id } = req.params;

    // Check if the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch the selected user
    const user = await User.findById(id);
    // Check if the user exists or not
    if (!user) {
        return res.status(400).json({ error: 'No such user' });
    }
    res.status(200).json(user);
};

// Create a new user
const createUser = async (req, res) => {
    // Fetch data from the request body
    const { firstName, lastName, emailAddress, password, role } = req.body;
    try {
        // Add user
        const user = await User.create({ firstName, lastName, emailAddress, password, role });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    // Get ID from the request param
    const { id } = req.params;

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
    res.status(200).json(user);
};

// Update a user
const updateUser = async (req, res) => {
    // Get ID from the request param
    const { id } = req.params;

    // Check if the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch the selected user
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
    // Check if the user exists or not
    if (!user) {
        return res.status(400).json({ error: 'No such user' });
    }
    res.status(200).json(user);
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};
