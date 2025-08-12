import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.svg'
import heart from '../assets/Heart.svg'
import cart from '../assets/ShoppingBag.svg'
import search from '../assets/Loupe.svg'
import filtersort from '../assets/List.svg'
import Profile from'./Profile'
import Cart from "./Cart"
import WishList from "./WishList"

function Header({ cartItems,onUpdate }) {

  //variables for Profile

  const [isProfileOpen, setisProfileOpen] = useState(false);
    const handleOpenProfile = () => {
      setisProfileOpen(true);
    };
  
    const handleCloseProfile = () => {
      setisProfileOpen(false);
    };

    //variables for wishList

    const [isWishListOpen, setisWishListOpen] = useState(false);
    const handleOpenWishList = () => {
      setisWishListOpen(true);
    };
  
    const handleCloseWishList = () => {
      setisWishListOpen(false);
    };

    //variables for Cart

    const [isCartOpen, setisCartOpen] = useState(false);
    const handleOpenCart = () => {
      setisCartOpen(true);
    };
  
    const handleCloseCart = () => {
      setisCartOpen(false);
    };
    

  return (
    <>
      <header className="header">
        <div
          className="profile-menu"
          onClick={() => {
            handleOpenProfile();
            handleCloseWishList();
            handleCloseCart();
          }}>
          <img src={filtersort}></img>
        </div>
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="searchcartwish">
          <div className="search">
            <img src={search}></img>
          </div>
          <div
            className="wishlist"
            onClick={() => {
              handleOpenWishList();
              handleCloseCart();
              handleCloseProfile();
            }}>
            <img src={heart}></img>
          </div>
          <div
            className="cart"
            onClick={() => {
              handleCloseWishList();
              handleCloseProfile();
              handleOpenCart();
            }}>
            <img src={cart}></img>
          </div>
        </div>
      </header>
      {isProfileOpen && <Profile onClose={handleCloseProfile} />}
      {isWishListOpen && <WishList onClose={handleCloseWishList} />}
      {isCartOpen && <Cart onClose={handleCloseCart} cartItems={cartItems} onUpdate={onUpdate} />}
    </>
  );
}

export default Header