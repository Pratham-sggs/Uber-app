const { hash } = require('bcrypt');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult, cookie } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


// This function is used to register a new captain
// It will check if the captain already exists
// It will hash the password and create a new captain
module.exports.registerCaptain = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });

    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token,captain});
}

// This function is used to login the captain
// It will check if the captain exists and if the password is correct
// It will also generate a token and set it in the cookie
// It will return the captain object and the token
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordMatch = await captain.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token,);
    res.status(200).json({ token, captain });
}

// This function is used to get the captain profile
// It will return the captain object
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}



// This function is used to Logout the captain
// It will blacklist the token and clear the cookie
// It will also return a success message
module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}