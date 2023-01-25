const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for note
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Export the data model of note
module.exports = mongoose.model('note', noteSchema);