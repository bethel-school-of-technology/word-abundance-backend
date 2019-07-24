const router = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const {loginValidation}  = require('../../api/validation/validation')
const bcrypt = require('bcrypt');

// Login
router.post('/', async (req, res) => {
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

// Logout