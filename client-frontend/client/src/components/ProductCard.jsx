import React from 'react';
import './ProductCard.css';
import backgroundimage from '../assets/Rectangle.png'

function ProductCard({ name, main_price,discounted_price}) {
  function alertMsg(event){
    alert("Clicked on " +event.target);
  }

  function addToCart(event){
    alert(`${name} added to cart`);
    // console.log(event.this);
    event.stopPropagation()
  }

  return (
    <div className="product-card" onClick={alertMsg}>
      <div className='imagecontainer'>
        <img src={backgroundimage} alt="Product" />
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