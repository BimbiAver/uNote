require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");

const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const { isLoggedIn } = require("./middleware/auth.middleware");

// Express app
const app = express();

// Middleware
app.use(cors()); // Add CORS headers
app.use(express.json()); // Parse requests (content-type - application/json)
app.use(morgan("tiny")); // Log HTTP requests and errors

app.use((req, res, next) => {
  // console.log(`Path: ${req.path} Method: ${req.method}`);
  next();
});

// Define the route handlers
app.use('/api/notes', isLoggedIn, noteRoutes);
app.use('/api/users', isLoggedIn, userRoutes);
app.use('/api/auth', authRoutes);

// Connect to the DB
mongoose.set('strictQuery', true); // Fix the deprecation warning
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to the DB & listening on port ' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
