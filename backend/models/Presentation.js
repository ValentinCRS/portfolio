// Import Mongoose to define the schema
const mongoose = require('mongoose');

// Define the Profil schema
const profilSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    email: { type: String },
    telephone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    cv_url: { type: String }
});

// Export the Profil model
module.exports = mongoose.model('Profil', profilSchema);