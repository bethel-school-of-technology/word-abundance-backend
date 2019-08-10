const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);