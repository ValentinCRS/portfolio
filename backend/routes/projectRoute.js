const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

// Get all projects
router.get('/', projectController.getAllProjects);
// Get project by ID
router.get('/:id', projectController.getProjectById);
// Create, Update, Delete project (protected routes by auth middleware)
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;