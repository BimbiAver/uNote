const express = require('express');

const router = express.Router();

// GET all notes
router.get('/', (req, res) => {
  res.json({ msg: 'Here are all the notes' });
});

// GET a specific note
router.get('/:id', (req, res) => {
  res.json({ msg: "Here's your requested note" });
});

// POST a new note
router.post('/', (req, res) => {
  res.json({ msg: 'Your note has been saved' });
});

// DELETE a note
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Your note has been deleted' });
});

// UPDATE a note
router.patch('/:id', (req, res) => {
  res.json({ msg: 'Your note has been updated' });
});

module.exports = router;
