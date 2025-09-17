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
    }
};
(module.exports = sqlqueries);
