const router = require('express').Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
    id: 1,
    firstName: "Bill",
    lastname: "Jones",
    email: "Jones90@outlook.com",

  }, {
    id: 2,
    firstName: "Frank",
    lastName: "Nixon",
    email: "frankN@yahoo.com"
  }]);
});

module.exports = router;