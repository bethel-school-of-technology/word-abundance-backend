const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for user schema
let user = new Schema({
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

module.exports = mongoose.model('user', user);