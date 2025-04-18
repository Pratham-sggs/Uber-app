const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

// This middleware function checks if the user is authenticated by verifying the JWT token.
// It extracts the token from the request headers or cookies, verifies it, and retrieves the user information.
// If the token is valid, it attaches the user information to the request object and calls the next middleware.
// If the token is invalid or not provided, it sends a 401 Unauthorized response.
module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token});

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
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

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        req.captain = captain;
        return next(); // ✅ THIS LINE WAS MISSING
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};