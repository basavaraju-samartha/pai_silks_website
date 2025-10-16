const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer login
router.post('/customer-login', customerController.customerLogin);


// To get the collections
router.get('/collections', customerController.getAllCollections);

//To get bestseller collections
router.get('/bestsellers', customerController.getBestSellers);

//To get the categories
router.get('/categories', customerController.getAllCategories);


//To get productbyID
router.get('/:productId', customerController.getProductById);



module.exports = router;
