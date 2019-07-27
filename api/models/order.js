const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, defaul: 1 },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    hourlyrate: { type: Number }
});

module.exports = mongoose.model('Order', orderSchema);