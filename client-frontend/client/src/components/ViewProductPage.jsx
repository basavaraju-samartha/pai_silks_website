import "./ViewProductpage.css"
import {React, useState, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import frame from '../assets/heroframe.svg'
import bestsellerheart from '../assets/bestsellerheart.svg'
import HeartSvg from '../assets/bestsellerheart.svg?react';
import stardecor from '../assets/star-decoration.svg'
import Header from './Header';
import Footer from './Footer';
import similarProducts from "../products";
import ProductCard from "./ProductCard";
import { CartContext } from "../CartContext";

function ViewProductPage() {
  const { cartItems, setCartItems,wishListItems, setWishListItems, handleAddToCart, handleAddToWishList } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [fillColor, setFillColor] = useState('transparent');

  const handleSvgClick = () => {
    setFillColor(currentColor => currentColor === 'transparent' ? '#ffc780' : 'transparent');
  };

  const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
  const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

  if (!product) {
    return <p>No product data found. <button onClick={() => navigate("/product")}>Go Back</button></p>;
  }

  return (
    <>
      <Header cartItems={cartItems} onUpdate={updateCart} wishListItems={wishListItems} onWishListUpdate={updateWishList} />
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <div className="main-product-display-section">
        <img src={frame} alt="" className="product-upframe" />
        <div className='product-saree-section'>
            
            <div className='main-saree-image'><img src={product.image1}/></div>

            <div className='additional-saree-images'>
              <div className='additional-saree-image-1'><img src={product.image2}/></div>
              <div className='additional-saree-image-2'><img src={product.image3}/></div>
              <div className='additional-saree-image-3'><img src={product.image4}/></div>
            </div>

            <div className='main-saree-desc'>
              <HeartSvg className='sub-desc-heart' fill={fillColor} onClick={()=>{handleAddToWishList(product);handleSvgClick()}} />
              {/* <div className='sub-desc-heart' onClick={()=>handleAddToWishList(product)}><img src={bestsellerheart} alt="" /></div> */}
              <div className='sub-desc-name'><h1>{product.name}</h1></div>
              <div className='sub-desc-desc'><p>{product.description}</p></div>
              <div className='sub-desc-price-section'>
                <div className='main-price'><del><h5>₹ {product.main_price}</h5></del></div>
                <div className='disc-price'><h2>₹ {product.discounted_price}</h2></div>
              </div>
              <div className='action-buttons'>
                <button className='cart-button' onClick={()=>handleAddToCart(product)}><p>Add to Cart</p></button>
                <button className='buy-now-button'><p>Buy Now</p></button>
              </div>
            </div>
          </div>
        <img src={frame} alt="" className="product-downframe" />
      </div>
      <div className="product-description-section">
        <div className="stardecoration">
          <img src={stardecor} alt="" />
        </div>        
        <div className="product-description">
          <h1><u>Product Description</u></h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-details-section">
        <div className="stardecoration">
          <img src={stardecor} alt="" />
        </div>        
        <div className="product-details">
          <h1><u>Product Description</u></h1>
          <div className="complete-product-detail">
            <div className="detail">
              <h4>Product Code</h4>
              <p>{product.product_code}</p>
            </div>
            <div className="detail">
              <h4>Material</h4>
              <p>{product.category}</p>
            </div>
            <div className="detail">
              <h4>Saree Length</h4>
              <p>{product.saree_length}</p>
            </div>
            <div className="detail">
              <h4>Wash and Care</h4>
              <p>{product.wash_and_care}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-description-section">
        <div className="stardecoration">
          <img src={stardecor} alt="" />
        </div>        
        <div className="product-description">
          <h1><u>More Like This</u></h1>
        </div>
      </div>
          <div className="trending-section">
            <div className="product-grid-detail-page">
              {similarProducts.filter(
                (p) => p.category === product.category && p.id !== product.id)
                .slice(0, 10) // limit to 4 products
                .map((p) => (
                  <ProductCard key={p.id} {...p} onAddToCart={() => handleAddToCart(product)} />
                ))}
            </div>
          </div>
        
      
      <Footer/>
    </>
  );
}

export default ViewProductPage;

