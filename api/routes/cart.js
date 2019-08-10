const express = require('express');
const bodyParser = require('body-parser');
const verifytoken = require('../validation/verifyToken');
const CartController = require('../controllers/cart');

const router = express.Router();
const jsonParser = bodyParser.json();

// Creates new cart if there is none, Adds product to User cart, Updates quantity of product items
router.post('/', verifytoken, jsonParser, CartController.add_product_to_cart)
;

// Creates new cart if there is none, Adds service to User cart, Updates quantity of service hours
router.post('/service', verifytoken, jsonParser, CartController.add_service_to_cart);

// View shopping cart
router.get('/', verifytoken, CartController.view_cart);

// Removes product/service item from cart
router.put('/', verifytoken, jsonParser, CartController.delete_item);

// Deletes the entire shopping cart
router.delete('/:cartId', verifytoken, CartController.delete_cart);

module.exports = router;