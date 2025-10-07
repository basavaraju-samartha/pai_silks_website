const sqlqueries = {
    login: {
        getUserDetails: `SELECT * FROM master_user WHERE pri_email = ?`,
        getSessionDetails: `SELECT * FROM session WHERE pri_email = ? ORDER BY login_date_time DESC LIMIT 1`,
        createNewSession: `INSERT INTO session (session_id, user_id, pri_email, token, status) VALUES (?,?,?,?,?)`,
        updateToken: `UPDATE session SET token = ? WHERE sid = ?`,
        updateSessionStatus: `UPDATE session SET status = ?, logout_date_time = ? WHERE sid = ?`
    },

    product: {
        insertProduct: `INSERT INTO product (name, description, category, material, product_code, product_wash_care, regular_price, selling_price, saree_length) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    },

    dashBoard: {
        getOrderStats: `SELECT COUNT(*) AS totalOrders, SUM(status = 'Active') AS activeOrders, SUM(status = 'Delivered') AS completedOrders FROM orders`,
        getBestSellers: `SELECT p.id, p.name, p.selling_price, SUM(oi.quantity) AS total_sales, SUM(oi.price * oi.quantity) AS total_revenue FROM order_items oi JOIN product p ON oi.product_id = p.id JOIN orders o ON oi.order_id = o.order_id WHERE o.status = 'Delivered' GROUP BY p.id, p.name, p.selling_price ORDER BY total_sales DESC`,
        getRecentOrders: `SELECT o.order_id, o.order_date, o.status, o.total_amount, u.user_name AS customer_name FROM orders o JOIN master_user u ON o.user_id = u.user_id ORDER BY o.order_date DESC`
    }

};
(module.exports = sqlqueries);
