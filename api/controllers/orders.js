const mongoose = require("mongoose");
const Order = require('../models/order');
const Cart = require('../models/cart');
// const Product = require("../models/product");
// const Service = require('../models/service');

// Find all orders
exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select("cart ordernumber")
    .populate("cart ordernumber")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            cart: doc.cart,
            ordernumber: doc.ordernumber,
            request: {
              type: "GET",
              url: "http://localhost:3001/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

//   Find one order
exports.find_one_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        ordernumber: ordernumber,
        request: {
          type: "GET",
          url: "http://localhost:3001/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

// Create shopping cart order
exports.create_cart_order = (req, res, next) => {
  Cart.findById(req.body.cartId)
    .then(cart => {
      if (!cart) {
        return res.status(404).json({
          message: "Shopping cart not found"
        });
      } else {
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          ordernumber: req.body.ordernumber,
          cart: req.body.cartId
          
        });
        return order.save();
      };
    })
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          cartId: result.cart,
          ordernumber: result.ordernumber
        },
        request: {
          type: "GET",
          url: "http://localhost:3001/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      return () => res.status(500).json({
        message: "Orders not found",
        error: err
      });
    });
}


//   Delete one order
exports.delete_one_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3001/orders",
          body: { cartId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

//   Create product order
// exports.create_product_order = (req, res, next) => {
//   Product.findById(req.body.productId)
//     .then(product => {
//       if (!product) {
//         return res.status(404).json({
//           message: "Product not found"
//         });
//       } else {
//         const order = new Order({
//           _id: mongoose.Types.ObjectId(),
//           product: req.body.productId,
//           quantity: req.body.quantity
//         });
//         return order.save();
//       };
//     })
//     .then(result => {
//       console.log(result);
//       return res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           productId: result.product,
//           quantity: result.quantity
//         },
//         request: {
//           type: "GET",
//           url: "http://localhost:3001/orders/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return () => res.status(500).json({
//         message: "Orders not found",
//         error: err
//       });
//     });
// }

// Create service order
// exports.create_serviceorder = (req, res, next) => {
//   Service.findById(req.body.serviceId)
//     .then(service => {
//       if (!service) {
//         return res.status(404).json({
//           message: "Service not found"
//         });
//       }
//       const order = new Order({
//         _id: mongoose.Types.ObjectId(),
//         service: req.body.serviceId,
//         hourlyrate: req.body.hourlyrate
//       });
//       return order.save();
//     })
//     .then(result => {
//       console.log(result);
//       return res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           serviceId: result.service,
//           hourlyrate: result.hourlyrate
//         },
//         request: {
//           type: "GET",
//           url: "http://localhost:3001/orders/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).json({
//         message: "Orders not found",
//         error: err
//       });
//     });
// }

// exports.add_product_order = (req, res, next) => {
//   Product.findById(req.body.productId)
//     .then(product => {
//       if (!product) {
//         return res.status(404).json({
//           message: "Product not found"
//         });
//       } else {
//         const order = new Order({
//           _id: mongoose.Types.ObjectId(),
//           product: req.body.productId,
//           quantity: req.body.quantity,
//         });
//         return order.save();
//       };
//     })
//     .then(result => {
//       console.log(result);
//       return res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           productId: result.product,
//           quantity: result.quantity
//         },
//         request: {
//           type: "GET",
//           url: "http://localhost:3001/orders/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return () => res.status(500).json({
//         message: "Orders not found",
//         error: err
//       });
//     });
// }



