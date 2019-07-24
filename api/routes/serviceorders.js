const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const serviceOrder = require("../models/serviceorder");
const Service = require("../models/service");
const async = require('async');


router.get("/", (res) => {
  serviceOrder.find()
    .select("service hourlyrate _id")
    .populate("service name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
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
});


router.post('/', async (req, res) => {
  Service.find(req.params.serviceId);

    let order = new serviceOrder({
    _id: mongoose.Types.ObjectId(),
    service: req.body.serviceId,
    hourlyrate: req.body.hourlyrate
  });
  try {
    let savedorder = await order.save();
      res.send(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          service: result.service,
          hourlyrate: result.hourlyrate
        },
        request: {
          type: "GET",
          url: "http://localhost:3001/serviceorders/" + result._id
        }
      });
      } catch {
        (err => {
          console.log(err);
          return res.status(500).json({
            message: "Orders not found",
            error: err
          });
        });
      }
    });

// router.post("/", async (req, res) => {
//   Service.find(req.params.serviceId)
//     .then(service => {
//       if (!service ) {
//         return res.status(404).json({
//           message: "Service not found"
//         });
//       } else {
//       const order = new serviceOrder({
//         _id: mongoose.Types.ObjectId(),
//         service: req.body.serviceId,
//         hourlyrate: req.body.hourlyrate
//       });
      
//     };
//     })
//     .then(result => {
//       console.log(result);
//       return res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           service: result.service,
//           hourlyrate: result.hourlyrate
//         },
//         request: {
//           type: "GET",
//           url: "http://localhost:3001/serviceorders/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).json({
//         message: "Orders not found",
//         error: err
//       });
//     });
// });



router.get("/:orderId", (req, res) => {
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
});

router.delete("/:orderId", (req, res) => {
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
});

module.exports = router;