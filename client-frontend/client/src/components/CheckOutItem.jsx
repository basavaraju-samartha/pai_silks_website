import React, { useState } from "react";
import "./CheckOutItem.css";

function CheckOutItem({ item,  quantity }) {
  return (
    <>
      <div key={item.id} className="checkout-item">
        <div className="checkout-item-image">
          <img src={item.image1} alt="" />
          <div className="quantity-num">
            <div className="num-child">{item.quantity}</div>
          </div>
        </div>
        <div className="checkout-item-description">
          <div className="item-name">
            <p>{item.name}</p>
          </div>
        </div>
        <div className="checkout-item-price">
            <p>₹ {quantity * item.discounted_price}</p>
        </div>
      </div>
    </>
  );
}
export default CheckOutItem;
