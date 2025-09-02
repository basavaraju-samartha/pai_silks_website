import React from 'react';
import { useNavigate } from "react-router-dom";
import './ProductCard.css';

function ProductCard({ name, main_price, discounted_price, image1, image2, image3, image4, onAddToCart, description, category, product_code, material, saree_length, wash_and_care }) {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate("/product", { 
      state: { 
        product: { name, main_price, discounted_price, image1,image2, image3, image4, description, category, product_code, material, saree_length, wash_and_care } 
      } 
    });
  }

  function addToCart(event) {
    event.stopPropagation(); // Prevent opening product page
    alert(`${name} added to cart`);
    onAddToCart();
  }

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className='imagecontainer'>
        <img src={image1} alt={name} />
      </div>
      <h4>{name}</h4>
      <div className='priceandbutton'>
        <div>
          <h6><del>₹ {main_price}</del></h6>
          <h3>₹ {discounted_price}</h3>
        </div>
        <button onClick={addToCart}></button>
      </div>
    </div>
  );
}

export default ProductCard;