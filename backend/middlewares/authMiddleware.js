// Import JSON Web Token library for token verification
const jwt = require('jsonwebtoken');

// Middleware function to authenticate requests
module.exports = (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];
        // Verify token and decode it
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_TEMPORAIRE');
        // Attach userId from decoded token to request object
        req.auth = { userId: decodedToken.userId };
        next();
    } catch (error) {
        // Respond with 401 Unauthorized if token is invalid or missing
        res.status(401).json({ error: 'Unauthenticated request!' });
    }
};