// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enable CORS to allow requests from other origins
app.use(cors());

// Enable JSON body parsing for incoming requests
app.use(express.json());

// MongoDB connection URI (from environment variables or local fallback)
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Import application routes
const projectRoutes = require('./routes/projectRoute');
const authRoutes = require('./routes/authRoute');

// Register API routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// Test route to verify that the server is running
app.get('/test', (req, res) => res.send("The server is responding!"));

// Server port
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
