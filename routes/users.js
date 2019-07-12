// Importing important packages
const express = require('express');
 
// Using express and routes
const app = express();
const userRoute = express.Router();

// user module which is required and imported
let userModel = require('../models/user');

// To Get List Of users
userRoute.route('/').get(function (req, res) {
userModel.find(function (err, user) {
if (err) {
console.log(err);
}
else {
  res.json(user);
  }
  });
  });
  
  // To Add New user
  userRoute.route('/adduser').post(function (req, res) {
  let user = new userModel(req.body);
  user.save()
  .then(game => {
    res.status(200).json({ 'user': 'user Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
 });
 // To Get user Details By user ID
 userRoute.route('/edituser/:id').get(function (req, res) {
  let id = req.params.id;
  userModel.findById(id, function (err, user) {
  res.json(user);
  });
  });
  // To Update The user Details
 userRoute.route('/updateuser/:id').post(function (req, res) {
  userModel.findById(req.params.id, function (err, user) {
  if (!user)
  return next(new Error('Unable To Find user With This Id'));
  else {
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.save().then(emp => {
    res.json('user Updated Successfully');
    })
    .catch(err => {
    res.status(400).send("Unable To Update user");
    });
    }
    });
    });
    
    // To Delete The user
    userRoute.route('/deleteuser/:id').get(function (req, res) {
    userModel.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
      if (err) res.json(err);
      else res.json('user Deleted Successfully');
      });
      });
      
      module.exports = userRoute;    