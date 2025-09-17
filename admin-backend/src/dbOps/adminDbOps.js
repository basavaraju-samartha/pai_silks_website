// admindbops.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const sqlqueries = require('../dbOps/sqlQueries')

class Cmds {

    // Verify admin password
    async verifyAdminPasswd(pri_email, passwd) {
        try {
            const [rows] = await pool.query(sqlqueries.login.getUserDetails, [pri_email]);
            if (rows.length === 0) return null;
            const user = rows[0];
            const match = await bcrypt.compare(passwd, user.pass);
            return match ? user : null;
        } catch (err) {
            console.error("Error in verifyAdminPasswd:", err);
            throw err;
        }
    }

    // Get last session for given email
    async getAdminLastSessionByEmail(pri_email) {
        try {
            const [rows] = await pool.query(sqlqueries.login.getSessionDetails, [pri_email]);
            return rows[0] || null;
        } catch (err) {
            console.error("Error in getAdminLastSessionByEmail:", err);
            throw err;
        }
    }

    //create a new session
    async insertNewSession(user_id, pri_email, session_id, login_token, SESSION_ACTIVE) {
        try {
            const [result] = await pool.query(
                sqlqueries.login.createNewSession,
                [session_id, user_id, pri_email, login_token, SESSION_ACTIVE]
            );
            return result.insertId || null;
        } catch (err) {
            console.error("Error in insertNewSession:", err);
            throw err;
        }
    }

    // Update session token
    async updateToken(token, sid) {
        try {
            await pool.query(sqlqueries.login.updateToken, [token, sid]);
        } catch (err) {
            console.error("Error in updateToken:", err);
            throw err;
        }
    }

    // Update session status and logout time
    async updateSessionStatus(logoutTime, status, sid) {
        try {
            await pool.query(sqlqueries.login.updateSessionStatus, [status, logoutTime, sid]);
        } catch (err) {
            console.error("Error in updateSessionStatus:", err);
            throw err;
        }
    }

    async createProduct(productData) {
        try {
            await pool.query(sqlqueries.product.insertProduct, [productData.name,
            productData.description || null,
            productData.category || null,
            productData.material || null,
            productData.product_code || null,
            productData.product_wash_care || null,
            productData.regular_price,
            productData.selling_price || null,
            productData.saree_length || null,
            ]);
        } catch (err) {
            console.error("Error in updateSessionStatus:", err);
            throw err;
        }
    }
}
module.exports = new Cmds();
