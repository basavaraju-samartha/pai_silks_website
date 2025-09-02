import React from "react";
import './AboutUs.css'
import AboutUsImage from '../assets/aboutusimage.png'
import Header from "./Header";
import Footer from "./Footer";
import whatsapp from '../assets/whatsapp.svg'
import instagram from '../assets/instagram.svg'
import call from '../assets/call.svg'
import maps from '../assets/map-trifold.svg'
import { CartContext } from "../CartContext";
import { useEffect, useState, useContext } from "react";

const AboutUs = ({  }) => {
    const { cartItems, setCartItems,wishListItems, setWishListItems } = useContext(CartContext);

    const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
    const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

  return (
    <>
        <Header cartItems={cartItems} onUpdate={updateCart} wishListItems={wishListItems} onWishListUpdate={updateWishList}/>
        <div className="about-us-image-section">
            <div className="about-us-image">
                <img src={AboutUsImage} alt="" />
            </div>
            <div className="about-us-description">
                <h1><u>About Pai Silks</u></h1>
                <p> At Pai Silks, tradition meets elegance. For decades, we have been dedicated to bringing 
                    the timeless beauty of silk to every occasion.<br/><br/> 
                    Known for our uncompromising quality and 
                    craftsmanship, Pai Silks has become a trusted name for customers who seek authentic silk 
                    sarees, contemporary designs, and handpicked collections that celebrate India’s rich
                     textile heritage. <br/><br/>
                    From classic Kanjeevaram sarees to modern designer drapes, each piece at Pai Silks
                     is curated with care, ensuring that every fabric tells a story of artistry, culture,
                      and sophistication.</p>
            </div>
        </div>
        <div className="reach-us">
            <h1><u>Reach us At</u></h1>
            <div className="reach-container">
                <div className="whatsapp"><img src={whatsapp} alt="" /></div>
                <div className="instagram"><img src={instagram} alt="" /></div>
                <div className="call"><img src={call} alt="" /></div>
                <div className="maps"><img src={maps} alt="" /></div>
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default AboutUs;