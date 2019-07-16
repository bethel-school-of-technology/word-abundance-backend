let jwt = require('jsonwebtoken');

function auth (req, res, next){
    let token = req.header('auth-token');
    if (!token) return res.status(400).send('Access Denied');
    
    try {
        let verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
    }
    catch(err) {
        res.status(400).send('Invalid Token');
    }
}
module.exports = auth