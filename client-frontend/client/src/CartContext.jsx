import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems]=useState([])
  const [dynamicCartItem, setDynamicCartItem] = useState([]);
  const [total, setTotal] = useState(0);

  // ✅ Load cart from localStorage on first render
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const savedWishList = JSON.parse(localStorage.getItem("wishlist")) || [];
  setCartItems(savedCart);
  setWishListItems(savedWishList);
  setLoaded(true);
}, []);

useEffect(() => {
  if (loaded) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishListItems));
  }
}, [cartItems, wishListItems, loaded]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const handleAddToWishList=(product)=>{
    setWishListItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  return (
    <CartContext.Provider value={{cartItems, setCartItems, 
                                  wishListItems, setWishListItems, 
                                  dynamicCartItem, setDynamicCartItem,
                                  total, setTotal,
                                  handleAddToCart, handleAddToWishList 
                                  }}>
      {children}
    </CartContext.Provider>
  );
};