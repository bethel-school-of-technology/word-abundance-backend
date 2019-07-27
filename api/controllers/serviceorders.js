const mongoose = require("mongoose");
const serviceOrder = require("../models/serviceorder");
const Service = require("../models/service");

// Find all service orders
exports.get_all_serviceorders = (req, res, next) => {
    serviceOrder.find()
      .select("service hourlyrate _id")
      .populate("service name")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          serviceorders: docs.map(doc => {
            return {
              _id: doc._id,
              service: doc.service,
              hourlyrate: doc.hourlyrate,
              request: {
                type: "GET",
                url: "http://localhost:3001/serviceorders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }

  // Create service order
  exports.create_serviceorder = (req, res, next ) => {
    Service.findById(req.body.serviceId)
      .then(service => {
        if (!service ) {
          return res.status(404).json({
            message: "Service not found"
          });
        }
        const serviceorder = new serviceOrder({
          _id: mongoose.Types.ObjectId(),
          service: req.body.serviceId,
          hourlyrate: req.body.hourlyrate
        });
         return serviceorder.save(serviceorder);
      })
      .then(result => {
        console.log(result);
        return res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            serviceId: result.service,
            hourlyrate: result.hourlyrate
          },
          request: {
            type: "GET",
            url: "http://localhost:3001/serviceorders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: "Orders not found",
          error: err
        });
      });
  }

  // Find one service order
  exports.find_one_serviceorder = (req, res) => {
    serviceOrder.findById(req.params.orderId)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3001/serviceorders"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }

// Delete service order
  exports.delete_serviceorder = (req, res) => {
    serviceOrder.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3001/serviceorders",
            body: { serviceId: "ID", hourlyrate: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }