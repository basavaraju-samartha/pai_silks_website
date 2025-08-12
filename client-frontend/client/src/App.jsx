import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import FilterAndSort from './components/FilterandSort';
import Footer from './components/Footer';
import './App.css';
import productsData from "./products";

const App = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    categories: [],
  });
  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filteredProducts = productsData
    .filter(product =>
      product.discounted_price >= filters.minPrice &&
      product.discounted_price <= filters.maxPrice &&
      (filters.categories.length === 0 || filters.categories.includes(product.category))
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.discounted_price - b.discounted_price;
      if (sortOption === "highToLow") return b.discounted_price - a.discounted_price;
      return 0;
    });

  const categories = [...new Set(productsData.map((p) => p.category))];

  // State to control the visibility of the Div component
  const [isDivOpen, setIsDivOpen] = useState(false);
  const handleOpenDiv = () => {
    setIsDivOpen(true);
  };

  const handleCloseDiv = () => {
    setIsDivOpen(false);
  };

  //Add to cart

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productsData) => {
  setCartItems((prev) => {
    const isItemInCart = prev.some((item) => item.id === productsData.id);
      if (isItemInCart) {
        return prev;
      } else {
        return [...prev, productsData];
      }
    });
  };

  const updateCart=(dynamicCartItem)=>{
    setCartItems(dynamicCartItem)
  }

  return (
    <>
      <Header cartItems={cartItems} onUpdate={updateCart} />
      <div className="button-container">
        <button className='filter-sort-button' onClick={()=>handleOpenDiv()}><h4>Filter and Sort</h4></button>
      </div>
      <div className='app-wrapper'>
        {isDivOpen &&(
          <FilterAndSort
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            categories={categories}
            onClose={handleCloseDiv}
          />
        )}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;