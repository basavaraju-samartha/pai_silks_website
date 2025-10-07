const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer login
router.post('/customer-login', customerController.customerLogin);


// To get the collections
router.get('/collections', customerController.getAllCollections);

module.exports = router;
