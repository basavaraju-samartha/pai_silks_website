const dbCmds = require('../../dbOps/adminDbOps');

const createProduct = async (productData) => {
    // validate mandatory fields
    if (!productData.name || !productData.regular_price) {
        throw new Error("Product name and regular price are required");
    }
    return await dbCmds.createProduct(productData);
};

module.exports = {
    createProduct,
};
