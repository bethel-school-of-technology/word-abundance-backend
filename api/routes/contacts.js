const express = require('express');
const router = new express.Router();
const ContactsController = require('../controllers/contacts');

router.post("/", ContactsController.create_contact);

module.exports = router;