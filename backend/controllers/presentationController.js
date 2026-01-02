const Presentation = require('../models/Presentation');

// Controller functions for Presentation entity
exports.GetPresentation = async (req, res) => {
    try {
        const presentation = await Presentation.findOne();
        res.json(presentation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new Presentation
exports.CreatePresentation = async (req, res) => {
    try {
        const { name, description, email, telephone, linkedin, github, cv_url } = req.body;
        const newPresentation = new Presentation({
            name,
            description,
            email,
            telephone,
            linkedin,
            github,
            cv_url
        });
        await newPresentation.save();
        res.json(newPresentation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update existing Presentation
exports.UpdatePresentation = async (req, res) => {
    try {
        const { name, description, email, telephone, linkedin, github, cv_url } = req.body;
        const presentation = await Presentation.findOne();
        if (presentation) {
            presentation.name = name;
            presentation.description = description;
            presentation.email = email;
            presentation.telephone = telephone;
            presentation.linkedin = linkedin;
            presentation.github = github;
            presentation.cv_url = cv_url;
            await presentation.save();
            res.json(presentation);
        } else {
            const newPresentation = new Presentation({
                name,
                description,
                email,
                telephone,
                linkedin,
                github,
                cv_url
            });
            await newPresentation.save();
            res.json(newPresentation);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Presentation
exports.DeletePresentation = async (req, res) => {
    try {
        const presentation = await Presentation.findOne();
        if (presentation) {
            await presentation.remove();
            res.json({ message: 'Presentation deleted' });
        } else {
            res.status(404).json({ message: 'Presentation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};