const express = require('express');
const mongodb = require('./data/database');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

//init app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" (connecting frontend) directory
app.use(express.static(path.join(__dirname, 'public')));



// Routes
const registerRoute = require('./route/register');
app.use('/', registerRoute);


// Start server
mongodb.initDb(err => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server running on port ${port}`));
});