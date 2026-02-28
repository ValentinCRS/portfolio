const Experience = require('../models/Experience');

// 1. Function for creating a new experience
exports.createExperience = async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Function to get all experiences
exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Function to get an experience by ID
exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Function to update an experience
exports.updateExperience = async (req, res) => {
    try {
        const { title, company, start_date, end_date, description } = req.body;
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, { 
            title, company, start_date, end_date, description
        }, { new: true });
        if (!updatedExperience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json(updatedExperience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Function to delete an experience
exports.deleteExperience = async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};