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


  // get collections
  async getAllCollections() {
    try {
      const [rows] = await pool.query(sqlqueries.product.getAllCollections);
      return rows;
    } catch (err) {
      console.error("Error in getAllCollections:", err);
      throw err;
    }
  }

  // ✅ NEW: Get all best sellers (includes stock + primary image)
  async getBestSellers(limit = 6) {
    try {
      const [rows] = await pool.query(sqlqueries.product.getBestSellers, [limit]);
      return rows;
    } catch (err) {
      console.error("Error in getBestSellers:", err);
      throw err;
    }
  }
  

  // Get all categories
async getAllCategories() {
  try {
    const [rows] = await pool.query(sqlqueries.product.getAllCategories);
    return rows;
  } catch (err) {
    console.error("Error in getAllCategories:", err);
    throw err;
  }
}


// Get product by ID with all images
async getProductByIdWithImages(productId) {
  try {
    const [rows] = await pool.query(
      sqlqueries.product.getProductByIdWithImages,
      [productId]
    );

    if (rows.length === 0) return null;

    // Convert images string to array
    const product = rows[0];
    product.images = product.images ? product.images.split(',') : [];

    return product;
  } catch (err) {
    console.error("Error in getProductByIdWithImages:", err);
    throw err;
  }
}

// Get products by category
async getProductsByCategory(category) {
  try {
    const [rows] = await pool.query(sqlqueries.product.getProductsByCategory, [category]);
    return rows;
  } catch (err) {
    console.error("Error in getProductsByCategory:", err);
    throw err;
  }
}

// Check if product already exists
async checkWishlist(user_id, product_id) {
  try {
    const [rows] = await pool.query(sqlqueries.wishlist.checkWishlist, [
      user_id,
      product_id,
    ]);
    return rows;
  } catch (err) {
    console.error("Error in checkWishlist:", err);
    throw err;
  }
}

// Add product to wishlist
async addToWishlist(user_id, product_id) {
  try {
    const [rows] = await pool.query(sqlqueries.wishlist.addToWishlist, [
      user_id,
      product_id,
    ]);
    return rows;
  } catch (err) {
    console.error("Error in addToWishlist:", err);
    throw err;
  }
}

// Get all wishlist items for a user
async getWishlist(user_id) {
  try {
    const [rows] = await pool.query(sqlqueries.wishlist.getWishlist, [
      user_id,
    ]);
    return rows;
  } catch (err) {
    console.error("Error in getWishlist:", err);
    throw err;
  }
}



// Check if product exists in wishlist
async checkWishlist(user_id, product_id) {
  const [rows] = await pool.query(sqlqueries.wishlist.checkWishlist, [
    user_id,
    product_id,
  ]);
  return rows;
}

// Wishlist count
async wishlistCount(user_id) {
  const [rows] = await pool.query(sqlqueries.wishlist.wishlistCount, [
    user_id,
  ]);
  return rows[0];
}

// Check if product exists in cart
async checkCart(user_id, product_id) {
  const [rows] = await pool.query(sqlqueries.cart.checkCart, [
    user_id,
    product_id,
  ]);
  return rows;
}

// Add product to cart
async addToCart(user_id, product_id) {
  const [rows] = await pool.query(sqlqueries.cart.addToCart, [
    user_id,
    product_id,
  ]);
  return rows;
}

// Remove a product from wishlist
async removeFromWishlist(user_id, product_id) {
  try {
    const [rows] = await pool.query(
      sqlqueries.wishlist.removeFromWishlist,
      [user_id, product_id]
    );
    return rows;
  } catch (err) {
    console.error("Error in removeFromWishlist:", err);
    throw err;
  }
}

}

module.exports = new CustomerCmds();
