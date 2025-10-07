const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

//used to create a product
router.post('/create-product', adminController.createProduct);

router.get('/get-order-stats', adminController.getOrderStats);

router.get('/get-bestSeller-list', adminController.getBestSellerList);

router.get('/get-recent-orders', adminController.getRecentOrders);

module.exports = router;
