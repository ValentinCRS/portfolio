// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for skills
const skillsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }
});

// Export the Skill model based on the schema
module.exports = mongoose.model('Skill', skillsSchema);