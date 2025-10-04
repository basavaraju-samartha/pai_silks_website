const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


//used to create a product
router.post('/create-product', adminController.createProduct);

module.exports = router;
