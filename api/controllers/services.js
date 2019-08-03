const Service = require("../models/service");
const mongoose = require("mongoose");

// Create service
exports.create_service = (req, res, next) => {
    const service = new Service({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      hourlyrate: req.body.hourlyrate,
      serviceImage: req.file.path
    });
    service
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created service successfully",
          createdService: {
              _id: result._id,
              name: result.name,
              description: result.description,
              category: req.body.category,
              hourlyrate: result.hourlyrate,
              request: {
                  type: 'GET',
                  url: "http://localhost:3001/services/" + result._id
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
  }

// Get all services
  exports.get_all_services =  (req, res, next) => {
    Service.find()
      .select("_id name hourlyrate serviceImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          services: docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              category: req.body.category,
              hourlyrate: doc.hourlyrate,
              serviceImage: doc.serviceImage,
              request: {
                type: "GET",
                url: "http://localhost:3001/services/" + doc._id
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
  }

// Find one service
  exports.find_one_service =  (req, res, next) => {
    const id = req.params.serviceId;
    Service.findById(id)
      .select('_id name hourlyrate serviceImage')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3001/services'
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
  }

// Update service
  exports.update_service = (req, res, next) => {
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
                url: 'http://localhost:3001/services/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  // Delete service
  exports.delete_service = (req, res, next) => {
    const id = req.params.serviceId;
    Service.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Service deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3001/services',
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
  }