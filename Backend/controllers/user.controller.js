const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

// This function registers a new user by validating the request body and creating a new user in the database.
module.exports.registerUser = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    const {fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({ token, user });

}

// This function logs in a user by checking the email and password provided in the request body.
module.exports.loginUser = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password }= req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if(!user){
        return res.status(401).json({ message: 'invalid email or password' });
    }
    const isMatch  = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = await user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});
}
// This function retrieves the user profile from the request object and sends it as a response.
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Token already blacklisted
            console.log('Token already blacklisted.');
            res.clearCookie('token');
            return res.status(200).json({ message: 'Already logged out' });
        } else {
            console.error('Logout error:', error);
            return res.status(500).json({ message: 'Logout failed' });
        }
    }
};
