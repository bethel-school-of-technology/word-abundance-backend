const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    hourlyrate: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);