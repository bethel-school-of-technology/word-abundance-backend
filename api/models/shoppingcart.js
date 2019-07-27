const mongoose = require('mongoose');

const shoppingcartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    serviceorder: {type: mongoose.Schema.Types.ObjectId, ref: 'serviceOrder'}
});

module.exports = mongoose.model('Shoppingcart', shoppingcartSchema);