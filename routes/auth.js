let router = require('express').Router();
let User = require('../models/user');

// Validation 
let Joi = require('@hapi/joi');

let JoiSchema = {
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
    
}

router.get('/', (req, res) => {
    res.send('We are on home');
});

router.post('/signup', async (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password

    });
    try {
        let saveduser = await user.save();
        res.send(saveduser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('login', (req, res) => {
    res.send('Logged in');
});
module.exports = router;