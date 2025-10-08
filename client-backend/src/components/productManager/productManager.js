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

module.exports = {
  getAllCollections,
  getBestSellers,
};
