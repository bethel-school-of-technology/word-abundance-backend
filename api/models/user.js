const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    primaryPhone: {
        type: String,
        required: false,
        min: 6,
        max: 1024
    },
    address: {
        type: String,
        required: false,
        min: 3,
        max: 1024
    },
    city: {
        type: String,
        required: false,
        min: 3,
        max: 1024
    },
    state: {
        type: String,
        required: false,
        min: 2,
        max: 1024
    },
    country: {
        type: String,
        required: false,
        min: 3,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;