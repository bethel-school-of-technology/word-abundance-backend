const express = require("express");
const router = new express.Router();
const ServiceOrdersController = require('../controllers/serviceorders');

// Get all service orders
router.get("/", ServiceOrdersController.get_all_serviceorders);

// Create service order
router.post("/", ServiceOrdersController.create_serviceorder);

// Get one service order
router.get("/:orderId", ServiceOrdersController.find_one_serviceorder);

// Delete service order
router.delete("/:orderId", ServiceOrdersController.delete_serviceorder);

module.exports = router;