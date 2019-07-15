let router = require('express').Router();
let User = require('../models/user');
let Joi = require('@hapi/joi');

router.get('/', (req, res) => {
    res.send('We are on home');
});

router.post('/signup', async (req, res) => {

// LETS VALIDATE THE DATA BEFORE WE ADD A USER TO DB
    let {error} = Joi.validate(req.body,schema);
    if (error) return res.status(400).send(error.details[0].message);

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