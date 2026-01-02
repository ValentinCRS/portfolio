const skillsController = require('../controllers/skillsController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Get all skills
router.get('/', skillsController.AllSkills);
// Get skill by ID
router.get('/:id', skillsController.SkillsById);

// Create, Update, Delete skill (protected routes by auth middleware)
router.post('/', auth, skillsController.CreateSkill);
router.put('/:id', auth, skillsController.UpdateSkill);
router.delete('/:id', auth, skillsController.DeleteSkill);

module.exports = router;