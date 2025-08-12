import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = ({ onClose, cartItems, onUpdate }) => {
  // We'll store quantity for each item separately
  const [dynamicCartItem, setDynamicCartItem] = useState([]);

  // Initialize cart items with quantity = 1 when loaded
  useEffect(() => {
    const itemsWithQty = cartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setDynamicCartItem(itemsWithQty);
  }, [cartItems]);

  // Update quantity of a specific item
  const changeQuantity = (index, newQuantity) => {
    setDynamicCartItem(prev => {
      const updatedItems = [...prev];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: newQuantity,
      };
      return updatedItems;
    });
  };

  // Remove an item from cart
  const handleProductRemove = (e, index) => {
    const newCartItems = dynamicCartItem.filter((_, i) => i !== index);
    setDynamicCartItem(newCartItems);
    onUpdate(newCartItems);
  };

  // Calculate total based on quantity * unit price
  const total = dynamicCartItem.reduce(
    (acc, item) => acc + item.quantity * item.discounted_price,
    0
  );

  return (
    <div className="cart-wrapper">
      <div className="my-cart-panel">
        <div className="my-cart-naming-and-button">
          <p className="cart-main-name">Cart</p>
          <button className="cart-close-button" onClick={onClose}></button>
        </div>

        <div className="cart-products">
          {dynamicCartItem.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            dynamicCartItem.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onQuantityChange={changeQuantity}
                onRemove={handleProductRemove}
              />
            ))
          )}

          <div className="total-bill">
            <h3>Total bill</h3>
            <div className="total-cart-bill">
              <h3>Order Amount</h3>
              <h3>₹ {total}</h3>
            </div>
            <div className="delivery-bill">
              <h3>Delivery Fee</h3>
              <h3>₹ 99</h3>
            </div>
            <div className="grand-total">
              <h3>Grand Total</h3>
              <h3>₹ {total + 99}</h3>
            </div>
          </div>
        </div>

        {/* Add to cart Button */}
        <div className="checkout-button">
          <button className="checkout">
            <h4>Proceed to Checkout</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;