const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

// Get all projects
router.get('/', projectController.AllProjects);
// Get project by ID
router.get('/:id', projectController.ProjectById);
// Create, Update, Delete project (protected routes by auth middleware)
router.post('/', auth, projectController.CreateProject);
router.put('/:id', auth, projectController.UpdateProject);
router.delete('/:id', auth, projectController.DeleteProject);

module.exports = router;