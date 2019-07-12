const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for User schema
let User = new Schema({
    userid: {
        type: Number,
        default: 1
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', User);