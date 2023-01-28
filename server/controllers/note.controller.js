const Note = require('../models/note.model');
const mongoose = require('mongoose');

// Get all notes
const getNotes = async (req, res) => {
  const { userId } = req.user; // Fetch userId from the req.user property initialized by auth middleware
  // Fetch all notes in descending order - last updated datetime
  const notes = await Note.find({ userId: userId }).sort({ updatedAt: -1 });
  res.status(200).json(notes);
};

// Get a specific note
const getNote = async (req, res) => {
  const { userId } = req.user; // Fetch userId from the req.user property initialized by auth middleware
  // Get ID from the request param
  const { id } = req.params;

  // Check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  // Fetch the selected note
  const note = await Note.find({ _id: id, userId: userId });
  // Check if the note exists or not
  if (!note) {
    return res.status(400).json({ error: 'No such note' });
  }
  res.status(200).json(note);
};

// Create a new note
const createNote = async (req, res) => {
  // Fetch data from the request body
  const { title, content } = req.body;
  try {
    // Add data
    const note = await Note.create({ title, content, userId: req.user.userId });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { userId } = req.user; // Fetch userId from the req.user property initialized by auth middleware
  // Get ID from the request param
  const { id } = req.params;

  // Check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  // Fetch the selected note
  const note = await Note.findOneAndDelete({ _id: id, userId: userId });
  // Check if the note exists or not
  if (!note) {
    return res.status(400).json({ error: 'No such note' });
  }
  res.status(200).json(note);
};

// Update a note
const updateNote = async (req, res) => {
  const { userId } = req.user; // Fetch userId from the req.user property initialized by auth middleware
  // Get ID from the request param
  const { id } = req.params;

  // Check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  // Fetch the selected note
  const note = await Note.findOneAndUpdate(
    { _id: id, userId: userId },
    { ...req.body }
  );
  // Check if the note exists or not
  if (!note) {
    return res.status(400).json({ error: 'No such note' });
  }
  res.status(200).json(note);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
