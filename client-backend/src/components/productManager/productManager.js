// components/productManager/productManager.js
const dbCmds = require('../../dbOps/customerDbOps');

const getAllCollections = async () => {
  try {
    const collections = await dbCmds.getAllCollections();
    return collections;
  } catch (err) {
    console.error("Error in getAllCollections:", err);
    throw err;
  }
};


const getBestSellers = async () => {
  try {
    const bestSellers = await dbCmds.getBestSellers();
    return bestSellers;
  } catch (err) {
    console.error("Error in getBestSellers:", err);
    throw err;
  }
};

const getAllCategories = async () => {
  try {
    // 1. Await the database operation and store the result in a variable
    const categories = await dbCmds.getAllCategories();
    
    // 2. Return the stored result
    return categories; 
  } catch (err) { // Use 'err' or 'error' for consistency, here 'err' matches the example
    console.error("Error in productManager.getAllCategories:", err);
    throw err;
  }
};


// ✅ New: Get a single product by ID with all images
const getProductById = async (productId) => {
  try {
    const product = await dbCmds.getProductByIdWithImages(productId);
    return product; 
  } catch (err) {
    console.error("Error in productManager.getProductById:", err);
    throw err;
  }
};

//Get all the products of a category
const getProductsByCategory = async (category) => {
  try {
    return await dbCmds.getProductsByCategory(category);
  } catch (err) {
    console.error("Error in getProductsByCategory:", err);
    throw err;
  }
};

// ====== ADD PRODUCT TO WISHLIST ======
const addToWishlist = async (user_id, product_id) => {
  try {
    const exists = await dbCmds.checkWishlist(user_id, product_id);

    if (exists.length > 0) {
      return { already: true };
    }

    await dbCmds.addToWishlist(user_id, product_id);

    return { already: false };
  } catch (err) {
    console.error("Error in addToWishlist:", err);
    throw err;
  }
};

// ====== GET USER WISHLIST ======
const getWishlist = async (user_id) => {
  try {
    return await dbCmds.getWishlist(user_id);
  } catch (err) {
    console.error("Error in getWishlist:", err);
    throw err;
  }
};

// ====== REMOVE PRODUCT FROM WISHLIST ======
const removeWishlist = async (user_id, product_id) => {
  try {
    await dbCmds.removeWishlist(user_id, product_id);
    return true;
  } catch (err) {
    console.error("Error in removeWishlist:", err);
    throw err;
  }
};

// Check wishlist (for heart icon)
const checkWishlist = async (user_id, product_id) => {
  return await dbCmds.checkWishlist(user_id, product_id);
};

// Wishlist count
const wishlistCount = async (user_id) => {
  return await dbCmds.wishlistCount(user_id);
};

// ====== MOVE WISHLIST ITEM TO CART ======
const moveWishlistToCart = async (user_id, product_id) => {
  // Check if already in cart
  const inCart = await dbCmds.checkCart(user_id, product_id);
  if (inCart.length > 0) {
    // Remove from wishlist anyway
    await dbCmds.removeFromWishlist(user_id, product_id);
    throw new Error("Product already in cart");
  }

  // Add to cart
  await dbCmds.addToCart(user_id, product_id);

  // Remove from wishlist
  await dbCmds.removeFromWishlist(user_id, product_id);

  return true;
};





module.exports = {
  getAllCollections,
  getBestSellers,
  getAllCategories,
  getProductById,
  getProductsByCategory,
  addToWishlist,
  getWishlist,
  removeWishlist,
  wishlistCount,
  moveWishlistToCart, // <-- add here
  checkWishlist
};
