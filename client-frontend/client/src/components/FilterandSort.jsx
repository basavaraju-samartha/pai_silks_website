import React, { useState } from "react";
import "./FilterAndSort.css";
import rightarrow from '../assets/rightarrow.svg'
const FilterAndSort = ({onFilterChange,onSortChange,categories,onClose,}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [isFilterSectionVisible, setIsFilterSectionVisible] = useState(false);
  const [isCategoryFilterSectionVisible, setIsCategoryFilterSectionVisible] =useState(false);
  const [isSortSectionVisible, setIsSortSectionVisible] =useState(false);

  // Toggle price section
  const toggleFilterSection = () => {
    setIsFilterSectionVisible(!isFilterSectionVisible);
  };

  // Toggle category section
  const toggleCategoryFilterSection = () => {
    setIsCategoryFilterSectionVisible(!isCategoryFilterSectionVisible);
  };

  // Sort section
  const toggleSortSection = () => {
    setIsSortSectionVisible(!isSortSectionVisible);
  };

  // Select / Deselect category - DO NOT call onFilterChange here
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Sort change (immediate)
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
  };

  // Apply button handler
  const handleFilterSortApply = () => {
    onFilterChange({minPrice,maxPrice,categories: selectedCategories,});
    onClose(); 
    onSortChange(sortOption);

  };

  // Clear All button
  const handleClearAll = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedCategories([]);
    setSortOption("");
  };

  return (
    <div className="filter-sort-div">
      <div className="filter-sort-panel">
        <div className="filter-sort-naming-and-button">
          <p className="filter-sort-name">Filter and sort</p>
          <button className="close-button" onClick={onClose}></button>
        </div>

        <div className="filter-sort-options">
          {/* Price Filter */}
          <div className="price-filter" onClick={toggleFilterSection}>
            <div className="filter-name">
              <h3>Price Filter</h3>
              <img src={rightarrow} alt="" />
            </div>
            {isFilterSectionVisible && (
              <div className="filter-section" onClick={(e) => e.stopPropagation()}>
                <label>Price From: </label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}/>
                <label>To: </label>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}/>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="category-filter-main" onClick={toggleCategoryFilterSection}>
            <div className="filter-name">
              <h3>Category Filter</h3>
              <img src={rightarrow} alt="" />
            </div>
            {isCategoryFilterSectionVisible && (
              <div className="category-filter" onClick={(e) => e.stopPropagation()}>
                {categories.map((category) => (
                  <div key={category} className="category-item">
                    <label className="category-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}/>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort Option */}
          <div className="sort" onClick={toggleSortSection}>
            <div className="filter-name">
              <h3>Sort</h3>
              <img src={rightarrow} alt="" />
            </div>
            {isSortSectionVisible && (
            <select value={sortOption} onChange={handleSortChange} onClick={(e) => e.stopPropagation()} className="sortSelect">
              <option value="">--Select--</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>)}
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

export default FilterAndSort;
