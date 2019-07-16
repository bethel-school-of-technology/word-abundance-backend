const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Service = require("../models/service");

router.get("/", (req, res, next) => {
  Service.find()
    .select("name hourlyrate _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            hourlyrate: doc.hourlyrate,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/services/" + doc._id
            }
          };
        })
      };
        if (docs.length >= 0) {
      res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    hourlyrate: req.body.hourlyrate
  });
  service
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created service successfully",
        createdService: {
            name: result.name,
            hourlyrate: result.hourlyrate,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/services/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId;
  Product.findById(id)
    .select('name hourlyrate _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/services'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Service.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Service updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/services/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId;
  Service.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Service deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/services',
              body: { name: 'String', hourlyrate: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;