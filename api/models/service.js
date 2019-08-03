const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema =  new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    category: {type: String, required: true},
    description: { type: String, required: true},
    hourlyrate: { type: Number, required: true },
    serviceImage: { type: String, required: true }
});

const Service = mongoose.model('Service', serviceSchema, 'service');
module.exports = Service;
