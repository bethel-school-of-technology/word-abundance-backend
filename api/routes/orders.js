const express = require("express");
const router = new express.Router();
const OrdersController = require('../controllers/orders');

// Create product order
router.post("/", OrdersController.create_product_order );

// Get all product orders
router.get("/", OrdersController.get_all_product_orders );

// Get one product order
router.get("/:orderId", OrdersController.get_product_order );

// Delete product order
router.delete("/:orderId", OrdersController.delete_product_order);

module.exports = router;