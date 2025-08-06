import React, { useState } from "react";
import "./FilterAndSort.css";
import rightarrow from '../assets/rightarrow.svg'
const Profile = ({onFilterChange,onSortChange,categories,onClose,}) => {
  

  // Apply button handler
  const handleFilterSortApply = () => {
    onFilterChange({minPrice,maxPrice,categories: selectedCategories,});
    onClose(); 
    onSortChange(sortOption);

  };

  return (
    <div className="filter-sort-div">
      <div className="filter-sort-panel">
        <div className="filter-sort-naming-and-button">
          <p className="filter-sort-name">My Profile</p>
          <button className="close-button" onClick={onClose}></button>
        </div>

        <div className="filter-sort-options">
          {/* Price Filter */}
          <div className="price-filter" onClick={toggleFilterSection}>
            <div className="filter-name">
              <h3>Price Filter</h3>
              <img src={rightarrow} alt="" />
            </div> 
          </div>

          {/* Category Filter */}
          <div className="category-filter-main" onClick={toggleCategoryFilterSection}>
            <div className="filter-name">
              <h3>Category Filter</h3>
              <img src={rightarrow} alt="" />
            </div>
          </div>

          {/* Sort Option */}
          <div className="sort" onClick={toggleSortSection}>
            <div className="filter-name">
              <h3>Sort</h3>
              <img src={rightarrow} alt="" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="clear-all-and-apply-button">
          <button className="clear-all" onClick={handleClearAll}>
            <h4>Clear All</h4>
          </button>
          <button className="apply" onClick={handleFilterSortApply}>
            <h4>Apply</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
