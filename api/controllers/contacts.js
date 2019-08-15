const mongoose = require("mongoose");
const Contact = require("../models/contact");


exports.create_contact = (req, res, next)=>{
    console.log(req.file);
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message
    });
    contact
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Contact information sent to Admin",
            alert: "Contact information sent to Admin",
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            message: result.message
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}