const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer login
router.post('/customer-login', customerController.customerLogin);

module.exports = router;
