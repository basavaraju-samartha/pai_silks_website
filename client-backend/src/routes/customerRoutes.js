const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer login
router.post('/customer-login', customerController.customerLogin);


// To get the collection
router.get('/collections', customerController.getAllCollections);

//To get bestseller collections
router.get('/bestsellers', customerController.getBestSellers);

//To get the categories
router.get('/categories', customerController.getAllCategories);


//To get productbyID
router.get('/:productId', customerController.getProductById);

// get products by category
router.get('/products/:category', customerController.getProductsByCategory);

// add product to wishlistt and get roduct in the wish list and remove product from wish list
router.post('/wishlist/add', customerController.addToWishlist);
router.get('/wishlist/:user_id', customerController.getWishlist);
router.delete('/wishlist/remove', customerController.removeWishlist);
router.get("/wishlist/check", customerController.checkWishlist);
router.get("/wishlist/count/:user_id", customerController.wishlistCount);
router.post("/wishlist/move-to-cart", customerController.moveWishlistToCart);


module.exports = router;
