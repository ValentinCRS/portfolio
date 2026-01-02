// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String },
    link: { type: String },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }]
});


// Export the Project model
module.exports = mongoose.model('Project', projectSchema);