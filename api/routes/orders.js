const express = require("express");
const router = new express.Router();
const OrdersController = require('../controllers/orders');

// Create product order
router.post("/products", OrdersController.create_product_order );

// Create service order
router.post("/services", OrdersController.create_serviceorder );

// Get all orders
router.get("/", OrdersController.get_all_orders );

// Get one product order
router.get("/:orderId", OrdersController.find_one_order );

// Delete product order
router.delete("/:orderId", OrdersController.delete_one_order);

module.exports = router;