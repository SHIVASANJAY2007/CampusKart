const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid, authorization denied.' });
        }

        req.user = decoded;
        req.userId = decoded.userId || decoded.id; // Support both userId and id
        next();
    });
};

module.exports = isAuthenticated;