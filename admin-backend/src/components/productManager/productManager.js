const dbCmds = require('../../dbOps/adminDbOps');

const createProduct = async (productData) => {
    // validate mandatory fields
    if (!productData.name || !productData.regular_price) {
        throw new Error("Product name and regular price are required");
    }
    return await dbCmds.createProduct(productData);
};

const getCategoryWiseCount = async () => {
    return await dbCmds.getCategoryWiseCount();
};

const getAllProductDetails = async () => {
    return await dbCmds.getAllProductDetails();
};

module.exports = {
    createProduct,
    getCategoryWiseCount,
    getAllProductDetails
};
