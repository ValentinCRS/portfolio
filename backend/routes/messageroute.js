const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middlewares/authMiddleware');

// Route to create a new message
router.post('/', messageController.createMessage);
// Route to get all messages
router.get('/', auth, messageController.getAllMessages);
// Route to get a single message by ID
router.get('/:id', auth, messageController.getMessageById);
// Route to delete a message by ID
router.delete('/:id', auth, messageController.deleteMessageById);

module.exports = router;