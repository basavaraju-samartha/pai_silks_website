const sqlqueries = {
    login: {
        getUserDetails: `SELECT * FROM master_user WHERE pri_email = ?`,
        getSessionDetails: `SELECT * FROM session WHERE pri_email = ? ORDER BY login_date_time DESC LIMIT 1`,
        createNewSession: `INSERT INTO session (session_id, user_id, pri_email, token, status) VALUES (?,?,?,?,?)`,
        updateToken: `UPDATE session SET token = ? WHERE sid = ?`,
        updateSessionStatus: `UPDATE session SET status = ?, logout_date_time = ? WHERE sid = ?`
    },

    product: {
    
    getAllCollections: `
      SELECT DISTINCT collection 
      FROM product 
      WHERE is_deleted = 0 
      ORDER BY collection;
    `,

    getAllCategories: `
      SELECT DISTINCT category 
      FROM product 
      WHERE is_deleted = 0 
      ORDER BY category;
    `,

    // ✅ Get Bestsellers (includes product, stock, and primary image)
    getBestSellers: `
      SELECT 
          p.id,
          p.name,
          p.description,
          p.category,
          p.collection,
          p.material,
          p.product_code,
          p.product_wash_care,
          p.regular_price,
          p.selling_price,
          IFNULL(ps.stock_qty, 0) AS stock_qty,
          COUNT(oi.product_id) AS total_sold,
          pi.image_url AS primary_image
      FROM order_items oi
      JOIN product p ON oi.product_id = p.id
      LEFT JOIN product_stock ps ON p.id = ps.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary_image = 1
      WHERE p.is_deleted = 0 AND IFNULL(ps.stock_qty, 0) > 0
      GROUP BY 
          p.id, p.name, p.description, p.category, p.collection,
          p.material, p.product_code, p.product_wash_care,
          p.regular_price, p.selling_price, ps.stock_qty, pi.image_url
      ORDER BY total_sold DESC
      LIMIT ?;
    `,

  getProductByIdWithImages: `
  SELECT 
      p.id,
      p.name,
      p.description,
      p.category,
      p.collection,
      p.material,
      p.product_code,
      p.product_wash_care,
      p.regular_price,
      p.selling_price,
      IFNULL(ps.stock_qty, 0) AS stock_qty,
      GROUP_CONCAT(pi.image_url) AS images
  FROM product p
  LEFT JOIN product_stock ps ON p.id = ps.product_id
  LEFT JOIN product_images pi ON p.id = pi.product_id
  WHERE p.is_deleted = 0 AND p.id = ?
  GROUP BY 
      p.id, p.name, p.description, p.category, p.collection, 
      p.material, p.product_code, p.product_wash_care, 
      p.regular_price, p.selling_price, ps.stock_qty;
`,

getProductsByCategory: `
      SELECT * 
      FROM product 
      WHERE category = ? AND is_deleted = 0
      ORDER BY name;
    `,



  
    
  }

  
};
(module.exports = sqlqueries);
