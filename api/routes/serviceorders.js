const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ServiceOrder = require("../models/serviceorder");
const Service = require("../models/service");


router.post("/", (req, res, next) => {
    Service.findById(req.body.serviceId)
      .then(service => {
        if (!service) {
          return res.status(404).json({
            message: "Service not found"
          });
        }
        const order = new ServiceOrder({
          _id: mongoose.Types.ObjectId(),
          service: req.body.serviceId,
          hourlyrate: req.body.hourlyrate
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            service: result.service,
            hourlyrate: result.hourlyrate
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Orders not found",
          error: err
        });
      });
  });




module.exports = router;