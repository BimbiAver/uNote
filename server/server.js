require('dotenv').config();

const express = require('express');
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

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening on port 3000');
});
