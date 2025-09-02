import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import FilterAndSort from './components/FilterandSort';
import Footer from './components/Footer';
import ViewProductPage from './components/ViewProductPage'; // ✅ new import
import './App.css';
import productsData from "./products";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const App = () => {

  const navigate = useNavigate();
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 10000, categories: [] });
  const [sortOption, setSortOption] = useState("");
  const {cartItems, setCartItems,wishListItems, setWishListItems, handleAddToCart } = useContext(CartContext);
  const [isDivOpen, setIsDivOpen] = useState(false);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSortChange = (option) => setSortOption(option);
  const handleOpenDiv = () => setIsDivOpen(true);
  const handleCloseDiv = () => setIsDivOpen(false);

  const updateCart = (dynamicCartItem) => setCartItems(dynamicCartItem);
  const updateWishList = (dynamicWishListItem) => setWishListItems(dynamicWishListItem);

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

  return (
          <>
            <Header cartItems={cartItems} onUpdate={updateCart} wishListItems={wishListItems} onWishListUpdate={updateWishList} />
            <button onClick={() => navigate("/")}>Go Back</button>
            <div className="button-container">
              <button className='filter-sort-button' onClick={handleOpenDiv}><h4>Filter and Sort</h4></button>
            </div>
            <div className='app-wrapper'>
              {isDivOpen && (
                <FilterAndSort
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  categories={categories}
                  onClose={handleCloseDiv}
                />
              )}
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => handleAddToCart(product)}
                    onClick={()=>navigate("/product/:id")}
                  />
                ))}
              </div>
            </div>
            <Footer />
          </>
  );
};

export default App;