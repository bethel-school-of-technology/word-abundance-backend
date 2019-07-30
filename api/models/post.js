const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    postBody: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;