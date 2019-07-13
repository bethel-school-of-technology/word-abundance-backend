const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/service');

router.get('/', (req, res, next) => {
    Service.find()
    .select('name, hourlyRate, _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            services: docs.map(doc => {
                return {
                    name: doc.name,
                    hourlyRate: doc.hourlyRate,
                    _id: doc.id,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:3000/services/' + doc._id
                    }
                }
            })
        };
        if (docs.length >= 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: 'No Entries Found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const service = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        hourlyRate: req.body.hourlyRate
    });
    service
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created service successfully',
                createdService: {
                    name: result.name,
                    hourlyRate: result.hourlyRate,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:3000/services/' + result._id
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

router.get('/:serviceId', (req, res, next) => {
    const id = req.params.serviceId;
    Service.findById(id)
    .select('name, hourlyRate, _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    service: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all services',
                        url: 'http://localhost:3000/services'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for provided Id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:serviceId', (req, res, next) => {
    const id = req.params.serviceId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps [ops.propName] = ops.value;
    }
   Service.update({_id : id}, { $set: updateOps })
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

router.delete('/:serviceId', (req, res, next) => {
    const id = req.params.serviceId;
   Service.remove({_id : id})
   .exec()
   .then(result => {
       res.status(200).json({
           message: 'Service deleted',
           request: {
               type: 'POST',
               url: 'localhost:3000/services',
               body: { name: 'String', hourlyRate: 'Number'}
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