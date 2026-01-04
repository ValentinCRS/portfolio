// Import Mongoose to define the Message schema and model
const mongoose = require('mongoose');
// Define the Message schema
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

// Export the Message model
module.exports = mongoose.model('Message', messageSchema);