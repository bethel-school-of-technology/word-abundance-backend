const express = require("express");
const router = new express.Router();
const OrdersController = require('../controllers/orders');
const verifytoken = require('../validation/verifyToken');

// Create product order
router.post("/products", verifytoken, OrdersController.create_product_order );

router.put("/products/:orderId", verifytoken, OrdersController.add_product_order );

// Create service order
router.post("/services", verifytoken, OrdersController.create_serviceorder );

// Get all orders
router.get("/", verifytoken, OrdersController.get_all_orders );

// Get one product order
router.get("/:orderId", verifytoken, OrdersController.find_one_order );

// Delete product order
router.delete("/:orderId", verifytoken, OrdersController.delete_one_order);

module.exports = router;