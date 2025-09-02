import React, { useState, useEffect } from "react";
import "./WishList.css";
import WishListProductItem from "./WishListProductItem";

const WishList = ({onClose, wishListItems, onWishListUpdate}) => {
  const [dynamicWishListItem,setDynamicWishListItem]=useState([])

  useEffect(() => {
      setDynamicWishListItem(wishListItems.map(item => ({...item})));
    }, [wishListItems]);

  const handleWishListProductRemove = (e, index) => {
    const newWishListItems = dynamicWishListItem.filter((_, i) => i !== index);
    setDynamicWishListItem(newWishListItems);
    onWishListUpdate(newWishListItems);
  };  

  return (
    <div className="wishlist-wrapper">
      <div className="my-wishlist-panel">
        <div className="my-wishlist-naming-and-button">
          <p className="wishlist-main-name">WishList</p>
          <button className="wishlist-close-button" onClick={onClose}></button>
        </div>

        <div className="wishlist-products">
          {dynamicWishListItem.length === 0 ? (
            <p>No items in WishList</p>
          ) : (
            dynamicWishListItem.map((item, index) => (
              <WishListProductItem
                key={item.id}
                item={item}
                index={index}
                onRemove={handleWishListProductRemove}
              />
            ))
          )}
        </div>

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
