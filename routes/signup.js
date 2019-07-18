let router = require('express').Router();
let User = require('../models/user');
let {signupValidation}  = require('../validation')
let bcrypt = require('bcrypt')

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
        password: hashedPassword

    });
    try {
        let saveduser = await user.save();
        res.send(user = user.id);
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;