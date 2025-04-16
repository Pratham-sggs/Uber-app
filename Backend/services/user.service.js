const { model } = require('mongoose');
const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname , email , password
}) => {
    // if some filds are missing it will throw an error
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}