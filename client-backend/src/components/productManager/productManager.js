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



module.exports = {
  getAllCollections,
  getBestSellers,
  getAllCategories,
  getProductById,
  getProductsByCategory,
};
