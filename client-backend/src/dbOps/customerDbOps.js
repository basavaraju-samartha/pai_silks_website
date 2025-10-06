// customerDbOps.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const sqlqueries = require('../dbOps/sqlQueries');

class CustomerCmds {
  
  // Verify customer password
  async verifyCustomerPasswd(pri_email, passwd) {
    try {
      const [rows] = await pool.query(sqlqueries.login.getUserDetails, [pri_email]);
      if (rows.length === 0) return null;
      const user = rows[0];
      const match = await bcrypt.compare(passwd, user.pass);

      return match ? user : null;
    } catch (err) {
      console.error("Error in verifyCustomerPasswd:", err);
      throw err;
    }
  }

  // Get last session for given customer email
  async getCustomerLastSessionByEmail(pri_email) {
    try {
      const [rows] = await pool.query(sqlqueries.login.getSessionDetails, [pri_email]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in getCustomerLastSessionByEmail:", err);
      throw err;
    }
  }

  // Create a new customer session
  async insertNewCustomerSession(user_id, pri_email, session_id, login_token, SESSION_ACTIVE) {
    try {
      const [result] = await pool.query(
        sqlqueries.login.createNewSession,
        [session_id, user_id, pri_email, login_token, SESSION_ACTIVE]
      );
      return result.insertId || null;
    } catch (err) {
      console.error("Error in insertNewCustomerSession:", err);
      throw err;
    }
  }

  // Update customer session token
  async updateCustomerToken(token, sid) {
    try {
      await pool.query(sqlqueries.login.updateToken, [token, sid]);
    } catch (err) {
      console.error("Error in updateCustomerToken:", err);
      throw err;
    }
  }

  // Update session status (logout etc.)
  async updateCustomerSessionStatus(logoutTime, status, sid) {
    try {
      await pool.query(sqlqueries.login.updateSessionStatus, [status, logoutTime, sid]);
    } catch (err) {
      console.error("Error in updateCustomerSessionStatus:", err);
      throw err;
    }
  }
}

module.exports = new CustomerCmds();
