const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Service = require("../models/service");

// Adding an image to services
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname)
    cb(null, new Date().toISOString().replace(/:|\./g,'') + ' - ' + file.originalname);;
  }
});
const fileFilter = (req, file, cb) => {
  //reject an image
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false), ({
      message: 'Image must be .jpg or .png'
    })
  }
};
const upload = multer({
  storage:storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});







router.get("/", (req, res, next) => {
  Service.find()
    .select("_id name hourlyrate serviceImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
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
});

router.post("/", upload.single('serviceImage'), (req, res, next) => {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
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
});

router.get("/:serviceId", (req, res, next) => {
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
});

module.exports = router;