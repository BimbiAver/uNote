const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for user
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

// Export the data model of user
module.exports = mongoose.model('user', userSchema);
