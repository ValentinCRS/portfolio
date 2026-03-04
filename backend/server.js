// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enable CORS to allow requests from other origins
app.use(cors({
  origin: "https://portfolio-aig5aiiza-valentincrs-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

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
const messageRoutes = require('./routes/messageroute');
const authRoutes = require('./routes/authRoute');
const skillsRoutes = require('./routes/skillsRoute');
const presentationRoutes = require('./routes/presentationRoute');
const EXPRoutes = require('./routes/EXPRoute');

// Register API routes
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/presentation', presentationRoutes);
app.use('/api/experiences', EXPRoutes);

// Server port
const PORT = process.env.PORT || 10000;

// Start the server
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server started at http://localhost:${PORT}`);
});
