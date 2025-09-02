import React, { useState } from "react";
import "./WishListProductItem.css";

function WishListProductItem({ item, index, onRemove }) {

  const removeItem = (e) => {
    onRemove(e, index);
  };

  const addToCartOperation=()=>{

  }

  return (
    <div key={index} className="wishlist-item">
      <div className="wishlist-item-image">
        <img src={item.image1} alt="" />
      </div>
      <div className="wishlist-item-description">
        <div className="item-name">
          <h2>{item.name}</h2>
        </div>
        <div className="addCart-and-remove-button">
            <button className="wishlist-item-add-to-cart" onClick={addToCartOperation}>Add to Cart</button>
            <button className="remove-item-button" onClick={removeItem}>
            Remove
          </button>
        </div>
        <h3>₹ {item.discounted_price}</h3>
      </div>
    </div>
  );
}

export default WishListProductItem;