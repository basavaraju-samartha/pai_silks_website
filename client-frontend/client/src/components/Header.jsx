import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.svg'
import heart from '../assets/Heart.svg'
import cart from '../assets/ShoppingBag.svg'
import filtersort from '../assets/List.svg'
import ProfileSection from'./ProfileSection'
import Cart from "./Cart"
import WishList from "./WishList"

function Header({ cartItems,onUpdate, wishListItems, onWishListUpdate }) {

  //variables for Profile

  const [isProfileSectionOpen, setisProfileSectionOpen] = useState(false);
    const handleOpenProfileSection = () => {
      setisProfileSectionOpen(true);
    };
  
    const handleCloseProfileSection = () => {
      setisProfileSectionOpen(false);
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
            handleOpenProfileSection();
            handleCloseWishList();
            handleCloseCart();
          }}>
          <img src={filtersort}></img>
        </div>
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="cartwish">
          <div
            className="wishlist"
            onClick={() => {
              handleOpenWishList();
              handleCloseCart();
              handleCloseProfileSection();
            }}>
            <img src={heart}></img>
          </div>
          <div
            className="cart"
            onClick={() => {
              handleCloseWishList();
              handleCloseProfileSection();
              handleOpenCart();
            }}>
            <img src={cart}></img>
          </div>
        </div>
      </header>
      {isProfileSectionOpen && <ProfileSection onClose={handleCloseProfileSection} />}
      {isWishListOpen && <WishList onClose={handleCloseWishList} wishListItems={wishListItems} onWishListUpdate={onWishListUpdate}/>}
      {isCartOpen && <Cart onClose={handleCloseCart} cartItems={cartItems} onUpdate={onUpdate} />}
    </>
  );
}

export default Header