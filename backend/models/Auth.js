// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the Auth schema
const authSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Export the Auth model
module.exports = mongoose.model('Auth', authSchema);