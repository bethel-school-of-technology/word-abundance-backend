const router = require('express').Router();
const verify = require('../../post_api/verifyToken');
const Post = require('../models/post');

//Get All Posts
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

//Submits a Post
router.post('/', verify, async (req, res) => {
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

//Specific Post
router.get('/:postId', verify, async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message:err})
    }
})

//Delete a Specific Post
router.delete('/:postId', async (req, res) => {
    try {
        let removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost);
    } catch (err) {
        res.json({message:err})
    }
})

//Update a Specific Post
router.patch('/:postId', async (req, res) => {
    try {
        let updatedPost = await Post.updateOne({_id: req.params.postId}, 
            {$set: {title: req.body.title}}
            );
        res.json(updatedPost);
    } catch (err) {
        res.json({message:err})
    }
})

module.exports = router;