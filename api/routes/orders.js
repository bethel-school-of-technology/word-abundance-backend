const express = require("express");
const router = new express.Router();
const OrdersController = require('../controllers/orders');
const verifytoken = require('../validation/verifyToken');

// Create shopping cart order
router.post("/", verifytoken, OrdersController.create_cart_order );

// Get all orders
router.get("/", verifytoken, OrdersController.get_all_orders );

// Get one order
router.get("/:orderId", verifytoken, OrdersController.find_one_order );

// Delete one order
router.delete("/:orderId", verifytoken, OrdersController.delete_one_order);



// Create product order
// router.post("/products", verifytoken, OrdersController.create_product_order );

// router.put("/products/:orderId", verifytoken, OrdersController.add_product_order );

// Create service order
// router.post("/services", verifytoken, OrdersController.create_serviceorder );





module.exports = router;