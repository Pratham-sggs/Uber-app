const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// This is the user schema for the MongoDB database.
const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
        type: String,
        required: true,
        minlength:[3,'Fullname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength:[3,'Lastname must be at least 3 characters long'],
        }
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        
    },
    socketId: {
        type: String,
    },
})

// This method is used to generate a JWT token for the user.
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

// This method is used to compare the password entered by the user with the hashed password stored in the database.
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
// It uses bcrypt to compare the passwords.
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;