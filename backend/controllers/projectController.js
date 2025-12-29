const Projet = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
    try{
        const projects = await Projet.findAll();
        res.json(projects);
    } catch (erroe) {
        res.status(500).json({ error: erroe.message })
    }
}