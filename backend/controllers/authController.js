const Auth = require('../models/Auth'); // Import the Auth model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup controller
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new Auth({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Account successfully created!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
