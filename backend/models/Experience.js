// Import Mongoose to define the Message schema and model
const mongoose = require('mongoose');
// Define the Message schema
const EXPSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: false },
    start_date: { type: String, required: true },
    end_date: { type: String, required: false },
});

// Export the Message model
module.exports = mongoose.model('Experience', EXPSchema);