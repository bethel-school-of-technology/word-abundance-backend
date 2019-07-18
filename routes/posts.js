let router = require('express').Router();
let verify = require('./verifyToken');
let Post = require('../models/posts');

//Get All Posts
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find();
    }
    catch (err){
        res.json({message:err})
    }
});

//Submits a Post
router.post('/', async (req, res) => {
    let post = new Post({
        title: req.body.title,
        description: req.body.description

    });
    try {
        let savedPosts = await post.save()
        res.json(savedPosts);
    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;