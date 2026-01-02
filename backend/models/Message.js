// Import Mongoose to define the Message schema and model
const db = require('../db');

// Define the Message schema
const messageSchema = new db.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

// Export the Message model
module.exports = db.model('Message', messageSchema);