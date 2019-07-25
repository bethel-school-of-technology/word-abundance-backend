const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

// Get all product orders
exports.get_all_product_orders = (req, res, next) => {
    Order.find()
      .select("_id product quantity ")
      .populate("product quantity")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
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

//   Create product order
  exports.create_product_order = (req, res, next ) => {
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
         return res.status(404).json({
          message: "Product not found"
        });
      } else{
       const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
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
            productId: result.product,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3001/orders/" + result._id
          }
        });
      })
      .catch(err =>{
        console.log(err);
        return () => res.status(500).json({
          message: "Orders not found",
          error: err
        });
      });
  }

//   Get product order
  exports.get_product_order = (req, res, next) => {
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

//   Delete product order
  exports.delete_product_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3001/orders",
            body: { productId: "ID", serviceId: "ID", hourlyrate: "Number", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }