const express = require('express');
const router = express.Router();
const EXPController = require('../controllers/EXPController');
const auth = require('../middlewares/authMiddleware');

// Get all experiences
router.get('/', EXPController.getAllExperiences);
// Get experience by ID
router.get('/:id', EXPController.getExperienceById);
// Create, Update, Delete experience (protected routes by auth middleware)
router.post('/', auth, EXPController.createExperience);
router.put('/:id', auth, EXPController.updateExperience);
router.delete('/:id', auth, EXPController.deleteExperience);

module.exports = router;