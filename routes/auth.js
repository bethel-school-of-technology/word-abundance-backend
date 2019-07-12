let router = require('express').Router();
let User = require('../models/user');

router.post('/signup', async (req, res) => {
    let user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password

    });
    try{
        let saveduser = await user.save();
        res.send(saveduser);
    }
    catch(err) {
        res.status(400).send(err);
    }
});

router.post('login', (req, res) => {
    res.send('Logged in');
});
module.exports = router;