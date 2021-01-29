const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 60
    },
    last_name: {
        type: String,
        required: [true, "Please include the last name"],
        trim: true,
        minLength: 2,
        maxLength: 60
    },
    pseudo: {
        type: String,
        required: [true, "Please include the pseudo"],
        minLength: 2,
        maxLength: 60
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please include the email"],
        trim: true,
        maxLength: 190,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: [true, "Please include the password"],
        trim: true,
        minLength: 8,
        maxLength: 190
    },
    photo: {
        type: String,
        maxLength: 190,
        default : '/images/default_user.png'
    },
    is_connected: {
        type: Boolean,
        default : false
    },
    role: {
        type: String,
        required: true,
        default : 'member'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);