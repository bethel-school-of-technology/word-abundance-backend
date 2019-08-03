const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, default: 1 },
//     service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
//     hourlyrate: { type: Number },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
// });

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ordernumber: mongoose.Schema.Types.Number,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Order', orderSchema);