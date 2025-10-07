const dashboardDbOps = require('../../dbOps/adminDbOps');
const appConstants = require('../../appConstants');

async function getOrderStats() {
    try {
        return await dashboardDbOps.getOrderStats();
    } catch (error) {
        error.httpCode = error.httpCode || appConstants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

async function getBestSellers() {
    try {
        return await dashboardDbOps.getBestSellers();
    } catch (error) {
        error.httpCode = error.httpCode || appConstants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

async function getRecentOrders() {
    try {
        return await dashboardDbOps.getRecentOrders();
    } catch (error) {
        error.httpCode = error.httpCode || appConstants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

module.exports = {
    getOrderStats,
    getBestSellers,
    getRecentOrders
};
