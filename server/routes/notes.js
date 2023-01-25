const express = require('express');
const {
    getNotes,
    getNote,
    createNote,
} = require('../controllers/noteController');

const router = express.Router();

// GET all notes
router.get('/', getNotes);

// GET a specific note
router.get('/:id', getNote);

// POST a new note
router.post('/', createNote);

// DELETE a note
router.delete('/:id', (req, res) => {
    res.json({ msg: 'Your note has been deleted' });
});

// UPDATE a note
router.patch('/:id', (req, res) => {
    res.json({ msg: 'Your note has been updated' });
});

module.exports = router;
