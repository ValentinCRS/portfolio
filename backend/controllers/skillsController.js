const Skill = require('../models/skills');

// Get all skills
exports.AllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get skill by ID
exports.SkillsById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new skill
exports.CreateSkill = async (req, res) => {
    try {
        const { name, category } = req.body;
        const newSkill = new Skill({ name, category });
        await newSkill.save();
        res.json(newSkill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};

// Update an existing skill
exports.UpdateSkill = async (req, res) => {
    try {
        const { name, category } = req.body;
        const skill = await Skill.findByIdAndUpdate(req.params.id, { name, category }, { new: true });
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        await skill.save();
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a skill
exports.DeleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill pas trouver' });
        }
        res.status(200).json({ message: "Compétence supprimée avec succès !" });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};