const Project = require('../models/Project');

// 1. Function for creating a new project
exports.createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save().populate('skills');
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Function to get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('skills');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Function to get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('skills');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Function to update a project
exports.updateProject = async (req, res) => {
    try {
        const { title, description, image_url, link, skills } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, { 
            title, description, image_url, link, skills
        }, { new: true }).populate('skills');
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Function to delete a project
exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};