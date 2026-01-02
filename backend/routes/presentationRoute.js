const presentationController = require('../controllers/presentationController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Get presentation
router.get('/', presentationController.GetPresentation);
// Create and Update presentation (protected routes by auth middleware)
router.post('/', auth, presentationController.CreatePresentation);
router.put('/', auth, presentationController.UpdatePresentation);
module.exports = router;