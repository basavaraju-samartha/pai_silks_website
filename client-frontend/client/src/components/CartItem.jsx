import React, { useState } from "react";
import "./CartItem.css";

function CartItem({ item, index, onQuantityChange, onRemove }) {
  const [itemCount, setItemCount] = useState(item.quantity || 1);

  const incrementOperation = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    onQuantityChange(index, newCount);
  };

  const decrementOperation = () => {
    if (itemCount <= 1) return;
    const newCount = itemCount - 1;
    setItemCount(newCount);
    onQuantityChange(index, newCount);
  };

  const removeItem = (e) => {
    onRemove(e, index);
  };

  return (
    <div key={index} className="cart-item">
      <div className="cart-item-image">
        <img src={item.image1} alt="" />
      </div>
      <div className="cart-item-description">
        <div className="item-name">
          <h2>{item.name}</h2>
        </div>
        <div className="increment-and-remove-button">
          <div className="increment-and-decrement">
            <button className="decrement" onClick={decrementOperation}>
              -
            </button>
            <p className="item-count">{itemCount}</p>
            <button className="increment" onClick={incrementOperation}>
              +
            </button>
          </div>
          <button className="remove-item-button" onClick={removeItem}>
            Remove
          </button>
        </div>
        <h3>₹ {itemCount * item.discounted_price}</h3>
      </div>
    </div>
  );
}

export default CartItem;