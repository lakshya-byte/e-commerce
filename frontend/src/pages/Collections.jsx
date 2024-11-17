import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const [sortOption, setSortOption] = useState("Relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  const applyFilter = () => {
    // console.log("Applying filter...");
    let filteredProducts = products;

    if (showSearch && search) {
      filteredProducts = filterProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting
    if (sortOption === "High-Low") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Low-High") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    // console.log("Filtered Products:", filteredProducts);
    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOption, products, search, showSearch]);

  const resetFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setFilterProducts(products);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 flex">
      <button
        onClick={toggleFilterVisibility}
        className="block md:hidden text-white bg-gray-800 py-2 px-4 rounded-md mb-4"
      >
        {isFilterVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-100 p-6 rounded-lg shadow-md mb-6 w-full md:w-64 ${
          isFilterVisible ? "block" : "hidden"
        } md:block`}
      >
        <p className="text-xl font-semibold text-gray-800 mb-4">FILTERS</p>

        {/* Categories Filter */}
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Categories</p>
          <div className="flex flex-col space-y-2">
            {["Men", "Women", "Kids"].map((item) => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  value={item}
                  id={item}
                  className="mr-2"
                  checked={category.includes(item)}
                  onChange={toggleCategory}
                />
                <label htmlFor={item} className="text-gray-600 capitalize">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Type</p>
          <div className="flex flex-col space-y-2">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  id={type}
                  className="mr-2"
                  checked={subCategory.includes(type)}
                  onChange={toggleSubCategory}
                />
                <label htmlFor={type} className="text-gray-600 capitalize">
                  {type}
                </label>
              </div>
            ))}
            <button
              onClick={resetFilters}
              className="border border-black text-black py-2 px-4 rounded-md hover:bg-black hover:text-white transition duration-300 mt-4"
            >
              Reset filter
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 md:p-6 lg:p-8">
        {/* Title and Sort Dropdown */}
        <div className="flex items-center justify-between mb-6">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Sorting Dropdown */}
          <select
            className="bg-gray-200 text-gray-700 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Relevant">Relevant</option>
            <option value="Low-High">Price: Low to High</option>
            <option value="High-Low">Price: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterProducts.length ? (
            filterProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <ProductItem
                  id={item._id}
                  image={item.image} // Display first image
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))
          ) : (
            <p>No products match the filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
