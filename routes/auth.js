let router = require('express').Router();

router.post('/signup', (req, res) => {
    res.send('Success! You are now registered!');
});

router.post('login', (req, res) => {
    res.send('Logged in');
});
module.exports = router;