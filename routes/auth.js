let router = require('express').Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken');
let {signupValidation, loginValidation}  = require('../validation')
let bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send('We are on home');
});

router.post('/signup', async (req, res) => {

// LETS VALIDATE THE DATA BEFORE WE ADD A USER TO DB
    let {error} = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

// Checker if user is already in database
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

// Login
router.post('/login', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE LOGIN USER
    let {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checker if email exists
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found!');

    //Password is Correct
    let validPass = await bcrypt.compare(req.body.password, user.password,);
    if (!validPass) return res.status(400).send('Invalid Password');

    //Create JWT Token and assign a token
    let token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

  /*   res.send('Logged In') */
});
module.exports = router;