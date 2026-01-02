const message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const newMessage = new message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

// Get a single message by ID
exports.getMessageById = async (req, res) => {
    try {
        const msg = await message.findById(req.params.id);
        if (!msg) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve message' });
    }   
};

// Delete a message by ID
exports.deleteMessageById = async (req, res) => {
    try {
        const msg = await message.findByIdAndDelete(req.params.id);
        if (!msg) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
};