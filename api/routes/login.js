const router = require('express').Router();
const config = require('../validation/config')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const tokenList = {}
const {loginValidation}  = require('../validation/validation')
const bcrypt = require('bcrypt');

// Login
router.post('/', async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE LOGIN USER
    let {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checker if email exists
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found!');

    // Password is Correct
    let validPass = await bcrypt.compare(req.body.password, user.password,);
    if (!validPass) return res.status(400).send('Invalid Password');
    
    const postData = req.body;
    const player = {
        "email": postData.email,
        "password": postData.password
    }
    // Create and assign token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);

    // do the database authentication here, with user name and password combination.
   //const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(player, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response
    res.status(200).json(response);
});

 router.post('/token', (req,res) => {
    // refresh the auth token
    const postData = req.body
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "password": postData.password
        }
        const token = jwt.sign(player, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
});

router.use(require('../validation/tokenChecker'))

router.get('/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
})

// Logout
router.post('/logout', function(req, res){
    req.logOut();
    res.send("logged out", 401);

});

module.exports = router;