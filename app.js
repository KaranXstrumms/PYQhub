require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// API Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
