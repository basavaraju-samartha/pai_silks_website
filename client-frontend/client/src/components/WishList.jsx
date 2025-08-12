import React, { useState } from "react";
import "./WishList.css";


const WishList = ({onClose, isOpen}) => {
  return (
    <div className="wishlist-wrapper">
      <div className="my-wishlist-panel">
        <div className="my-wishlist-naming-and-button">
          <p className="wishlist-main-name">WishList</p>
          <button className="wishlist-close-button" onClick={onClose}></button>
        </div>

        <div className="wishlist-products">srjkj dhrthhj  gjj </div>

        {/* Add to cart Button */}
        <div className="add-to-cart">
          <button className="add-to-cart-button">
            <h4>Add to Cart</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishList;
