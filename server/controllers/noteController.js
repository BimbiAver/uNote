const Note = require('../models/noteModel');
const mongoose = require('mongoose');

// Get all notes
const getNotes = async (req, res) => {
    // Fetch all notes in descending order - last updated datetime
    const notes = await Note.find({}).sort({ updatedAt: -1 });
    res.status(200).json(notes);
};

// Get a specific note
const getNote = async (req, res) => {
    // Get ID from the request param
    const { id } = req.params;

    // Check if the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Fetch the selected note
    const note = await Note.findById(id);
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
        const note = await Note.create({ title, content });
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a note

// Update a note


module.exports = {
    getNotes,
    getNote,
    createNote
}