const Cart = require("../models/cart");

// Creates new cart if there is none, Adds product to User cart, Updates quantity of product items
exports.add_product_to_cart = (req, res) => {
    const user = req.body.user;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity
    };
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 
                'items.$.quantity': item.quantity,
                'items.$.price': item.price
            }
              })
              .exec()
              .then(() => res.end());
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.end());
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(() => res.end());
        }
      });
  };


// Creates new cart if there is none, Adds service to User cart, Updates quantity of service hours
  exports.add_service_to_cart = (req, res) => {
    const user = req.body.user;
    const item = {
      service: req.body.service,
      quantity: req.body.quantity
    };
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let services = foundCart.items.map((item) => item.service + '');
          if (services.includes(item.service)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { service: item.service }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              })
              .exec()
              .then(() => res.end());
          } else {
            foundCart.items.push(item);
            foundCart.save().then(() => res.end());
          }
        } else {
          Cart.create({
            user: user,
            items: [item]
          })
            .then(() => res.end());
        }
      });
  };


// View shopping cart
  exports.view_cart = (req, res) => {
    Cart.findOne({ user: req.user.id })
    .populate('items.product items.service')
    .select( 'items.product items.service')
    .exec((err, cart) => {
      if (!cart) {
        return res.send(null);
      }
  
      res.send(cart);
    });
  };


// Removes product/service item from cart
  exports.delete_item = (req, res) => {
    Cart.findById(req.body.cartId)
      .then((foundCart) => {
        foundCart.items = foundCart.items.filter((item) => item._id != req.body.itemId);
        foundCart.save(() => res.end());
      });
  };


// Deletes the entire shopping cart
  exports.delete_cart = (req, res) => {
      const id =req.params.cartId;
    Cart.remove({ _id : id})
      .then(() => res.end())
      .catch((err) => res.send(err));
  };