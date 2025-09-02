import './Homepage.css'
import Footer from './components/Footer';
import Header from './components/Header';
import ProductCard from './components/ProductCard'
import CategoryCard from './components/Categorycard.jsx';
import ReviewCard from './components/ReviewCard.jsx';
// import App from './App.jsx'
import ViewProductPage from './components/ViewProductPage'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import frame from './assets/heroframe.svg'
import heroimage1 from './assets/heroimage1.svg'
import wedding from './assets/weddingcoll.svg'
import party from './assets/partywearcoll.svg'
import festive from './assets/festivecoll.svg'
import casual from './assets/casualcoll.svg'
import underprice from './assets/underpricecoll.svg'
import finisher from './assets/finisher.svg'
import bestsellerheart from "./assets/bestsellerheart.svg"
import trendingProducts from "./products.js";
import { categories } from "./categoryData";
import reviews from "./reviews.js";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";

function Homepage() {
    const navigate = useNavigate();
    const { cartItems, setCartItems,wishListItems, setWishListItems, handleAddToCart } = useContext(CartContext);
    const topFourProducts = trendingProducts.slice(0, 9);
    const [mainSaree, rem1, rem2, rem3] = trendingProducts;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // 5 seconds

      return () => clearInterval(interval); // cleanup
    }, []);

    const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
    const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

    

  return (
    <>
      <Header cartItems={cartItems} onUpdate={updateCart} wishListItems={wishListItems} onWishListUpdate={updateWishList}/>
      <div className="herosection">
        <img className="upframe" src={frame}></img>
        <div className="heroimagesection">
          <img className="heroimages" src={heroimage1}></img>
        </div>
        <img className="downframe" src={frame}></img>
        <h1 className="headerdesc"><u>Check out our Collections</u></h1>
        <div className="catdiv" onClick={()=>navigate("/shop")}>
          <div className="category">
            <img src={wedding}></img>
            <h2>Wedding collections</h2>
          </div>
          <div className="category">
            <img src={party}></img>
            <h2>Party wear</h2>
          </div>
          <div className="category">
            <img src={festive}></img>
            <h2>Festive Collections</h2>
          </div>
          <div className="category">
            <img src={casual}></img>
            <h2>Casual wear</h2>
          </div>
          <div className="category">
            <img src={underprice}></img>
            <h2>Under 2000</h2>
          </div>
        </div>
        <div className="finishingline">
          <img src={finisher}></img>
        </div>
      </div>
      <h1 className="newcollheader"><u>Check out our Newest Collections</u></h1>
      <div className="trending-section">
        <div className="product-grid-homepage">
          {topFourProducts.map((product) => (
            <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </div>
      </div>
      <div className='bestsellers'>
        <img className="upframe" src={frame}></img>
          <h1 className="bestsellerheader"><u>Best Sellers</u></h1>
          <div className='bestseller-saree-section'>
            <div className='rem-saree'>
              <div className='rem-saree-1'><img src={mainSaree.image1}/></div>
              <div className='rem-saree-2'><img src={mainSaree.image1}/></div>
              <div className='rem-saree-3'><img src={mainSaree.image1}/></div>
            </div>
            <div className='main-saree'><img src={mainSaree.image1}/></div>
            <div className='main-saree-desc'>
              <div className='sub-desc-heart'><img src={bestsellerheart} alt="" /></div>
              <div className='sub-desc-name'><h1>{mainSaree.name}</h1></div>
              <div className='sub-desc-desc'><p>{mainSaree.description}</p></div>
              <div className='sub-desc-price-section'>
                <div className='main-price'><del><h5>₹ {mainSaree.main_price}</h5></del></div>
                <div className='disc-price'><h2>₹ {mainSaree.discounted_price}</h2></div>
              </div>
              <div className='buttons'>
                <button className='cart-button'><p>Add to Cart</p></button>
                <button className='buy-now-button'><p>Buy Now</p></button>
              </div>
            </div>
          </div>
        <img className="downframe" src={frame}></img>
      </div>
      <div className="saree-categories">
        <h1>Our Categories</h1>
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {categories.map((cat, index) => (
              <CategoryCard key={index} name={cat.name} image={cat.image} />
            ))}
            {categories.map((cat, index) => (
              <CategoryCard key={`dup-${index}`} name={cat.name} image={cat.image} />
            ))}
          </div>
        </div>
      </div>
      <div className="customerReview">
        <h1>Our Happy Customers</h1>
        <div className="reviews-container">
          <ReviewCard review={reviews[currentIndex]} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage