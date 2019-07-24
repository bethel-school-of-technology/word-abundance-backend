const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/order");



router.post("/", (req, res, next ) => {
  Product.find(req.params.productId)
  .then(product => {
    if (!product) {
       return res.status(404).json({
        message: "Product not found"
      });
    }
     const order = new Order({
      _id: mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity: req.body.quantity
    });
    return order.save();
  })
    .then(result => {
      console.log(result);
      return res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
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
});

router.get("/", (req, res, next) => {
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
});

router.get("/:orderId", (req, res, next) => {
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
});

router.delete("/:orderId", (req, res, next) => {
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
});

module.exports = router;