const router = require('express').Router();
const User = require('../models/user');
const {signupValidation}  = require('../validation/validation');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

// LETS VALIDATE THE DATA BEFORE WE ADD A USER TO DB
    let {error} = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

// Check if user is already in database
    let emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email Already Exists');

// Hash Passwords
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

// Create a New User
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        primaryPhone: req.body.primaryPhone,
        address: req.body.address,
        state: req.body.state,
        country: req.body.country,
        password: hashedPassword
    });
    try {
        let saveduser = await user.save();
        res.send(user = user.id);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a Specific User
router.delete('/:userId', async (req, res) => {
    try {
        let removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost);
    } catch (err) {
        res.json({message:err})
    }
})

// Update a User by Id (Email)
router.patch('/:userId/email', async (req, res) => {
    try {
        let updatedUser = await Post.updateOne({_id: req.params.userId}, 
            {$set: {email: req.body.email}}
            );
        res.json(updatedUser);
    } catch (err) {
        res.json({message:err})
    }
})

// Update a User by Id (Password)
router.patch('/:userId/password', async (req, res) => {
    try {
        let updatedUser = await Post.updateOne({_id: req.params.userId}, 
            {$set: {password: req.body.password}}
            );
        res.json(updatedUser);
    } catch (err) {
        res.json({message:err})
    }
})
module.exports = router;