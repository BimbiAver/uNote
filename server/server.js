require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes');

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Path: ${req.path} Method: ${req.method}`);
  next();
});

// Define the route handler
app.use('/api/notes', noteRoutes);

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
