const Auth = require('../models/Auth'); // Import the Auth model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Check the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'TEMPORARY_SECRET',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
