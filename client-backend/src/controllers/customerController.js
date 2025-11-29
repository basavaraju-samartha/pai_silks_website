const customerAuthManager = require('../components/customerLoginManager/customerAuthManager');
const customerLoginManager = require('../components/customerLoginManager/customerLoginManager');
const utils = require('../utils/utils');
const appDefines = require('../constants/appDefines');
const CookiesKey = require('../constants/cookieKeys');
const productManager = require('../components/productManager/productManager')

// customerController.js
exports.customerLogin = async (req, res) => {
  const { pri_email, passwd } = req.body;
  const token = req.cookies[CookiesKey.token];
  const session_id = req.cookies[CookiesKey.session_id];

  // Step 0: Validate input
  if (!pri_email || !passwd) {
    return utils.handleMissingParams(
      res,
      'pri_email, passwd are missing',
      'msg.error.missingRequiredFields'
    );
  }

  try {
    // Step 1: Validate credentials and check session/token expiry
    const loginResult = await customerAuthManager.validateCustomerLogin(
      pri_email,
      passwd,
      session_id,
      token
    );

    if (!loginResult.success) {
      return res.status(401).json({
        message: 'Invalid credentials',
        localeStr: 'msg.error.loginFailed',
      });
    }

    // Step 2: If valid session (still within 1 day)
    if (loginResult.validSession) {
      if (loginResult.token) {
        utils.setCookies(
          res,
          CookiesKey.token,
          loginResult.token,
          appDefines.expiryTime.tokenExpiryTime
        );
      }
      return res.status(200).json({
        message: 'Login successful',
        validSession: true,
        localeStr: 'msg.success.loginSuccess',
      });
    }

    // Step 3: If session expired or doesn't exist, create new session & token
    if (loginResult.createSession) {
      const result = await customerLoginManager.loginCustomerUser(
        loginResult.userData
      );

      if (!result.success) {
        return res.status(500).json({
          message: 'Login failed',
          localeStr: 'msg.error.loginFailed',
        });
      }

      // Set cookies for the new session
      const cookieSettings = [
        {
          key: CookiesKey.session_id,
          value: result.session_id,
          expiryTime: appDefines.expiryTime.sessionExpiryTime,
        },
        {
          key: CookiesKey.token,
          value: result.token,
          expiryTime: appDefines.expiryTime.tokenExpiryTime,
        },
        {
          key: CookiesKey.role_id,
          value: result.role_id,
          expiryTime: appDefines.expiryTime.sessionExpiryTime,
        },
        {
          key: CookiesKey.pri_email,
          value: result.pri_email,
          expiryTime: appDefines.expiryTime.sessionExpiryTime,
        },
      ];

      cookieSettings.forEach(({ key, value, expiryTime }) => {
        if (value) {
          const calculatedExpiryTime =
            key === CookiesKey.token
              ? expiryTime
              : utils.convertDaysToMsec(expiryTime);
          utils.setCookies(res, key, value, calculatedExpiryTime);
        }
      });

      return res.status(200).json({
        sid: result.sid,
        message: 'Login successful',
        user_status_id: result.user_status_id,
        localeStr: 'msg.success.loginSuccess',
      });
    }

    // Fallback
    return res.status(500).json({
      message: 'Unexpected login flow',
      localeStr: 'msg.error.loginFailed',
    });
  } catch (error) {
    return res.status(error.httpCode || 500).json({
      message: error.message || 'Login failed',
      localeStr: 'msg.error.loginFailed',
    });
  }
};


exports.getAllCollections = async (req, res) => {
  try {
    const collections = await productManager.getAllCollections();

    return res.status(200).json({
      success: true,
      data: collections,
      message: "Collections fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllCollections Controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch collections",
    });
  }
};


// ---------------------- GET BESTSELLERS ----------------------
exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await productManager.getBestSellers();
    return res.status(200).json({
      success: true,
      data: bestSellers,
      message: 'Bestsellers fetched successfully',
    });
  } catch (error) {
    console.error('Error in getBestSellers Controller:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bestsellers',
    });
  }
};

// ---------------------- GET ALL CATEGORIES ----------------------
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await productManager.getAllCategories();

    return res.status(200).json({
      success: true,
      data: categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllCategories Controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories",
    });
  }
};


// ---------------------- GET PRODUCT BY ID ----------------------
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // Call productManager to get product details with images
    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: 'Product fetched successfully',
    });
  } catch (error) {
    console.error('Error in getProductById Controller:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch product',
    });
  }
};

// ---------------------- GET PRODUCT BY Category ----------------------

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    const products = await productManager.getProductsByCategory(category);

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully"
    });
  } catch (error) {
    console.error("Error in getProductsByCategory Controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products"
    });
  }
};


// ====== ADD TO WISHLIST ======
exports.addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({
      success: false,
      message: "user_id and product_id are required",
    });
  }

  try {
    const result = await productManager.addToWishlist(user_id, product_id);

    if (result.already) {
      return res.status(200).json({
        success: true,
        message: "Product already in wishlist",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
    });

  } catch (error) {
    console.error("Error in addToWishlist controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
    });
  }
};

// ====== GET WISHLIST ITEMS ======
exports.getWishlist = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const result = await productManager.getWishlist(user_id);

    res.status(200).json({
      success: true,
      data: result,
      message: "Wishlist fetched successfully",
    });
  } catch (err) {
    console.error("Error in getWishlist Controller:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};

// ====== REMOVE FROM WISHLIST ======
exports.removeWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({
      success: false,
      message: "user_id and product_id are required",
    });
  }

  try {
    await productManager.removeWishlist(user_id, product_id);
    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });

  } catch (error) {
    console.error("Error in removeWishlist controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
    });
  }
};

exports.checkWishlist = async (req, res) => {
  try {
    const user_id = parseInt(req.query.user_id);
    const product_id = parseInt(req.query.product_id);

    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "user_id and product_id are required",
      });
    }

    const result = await productManager.checkWishlist(user_id, product_id);

    res.status(200).json({
      success: true,
      exists: result.length > 0,
    });
  } catch (err) {
    console.error("Error in checkWishlist:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.wishlistCount = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await productManager.wishlistCount(user_id);

    res.status(200).json({
      success: true,
      count: result.count,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.moveWishlistToCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "user_id and product_id are required",
      });
    }

    await productManager.moveWishlistToCart(user_id, product_id);

    res.status(200).json({
      success: true,
      message: "Moved product from wishlist to cart",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
