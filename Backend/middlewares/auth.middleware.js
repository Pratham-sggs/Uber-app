const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// This middleware function checks if the user is authenticated by verifying the JWT token.
// It extracts the token from the request headers or cookies, verifies it, and retrieves the user information.
// If the token is valid, it attaches the user information to the request object and calls the next middleware.
// If the token is invalid or not provided, it sends a 401 Unauthorized response.
module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //This verify method will decode the token and verify its signature

        const user = await userModel.findById(decoded._id);  // This will find the user by the id in the token

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};