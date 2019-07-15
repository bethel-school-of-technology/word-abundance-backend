let router = require('express').Router();

router.get ('/', (req, res) => {
    res.json({
        posts:{
            title: 'my first post',
            description: "random data you shouldn't access"
        }
    });
});
module.exports = router;