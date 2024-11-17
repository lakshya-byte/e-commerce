import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if the current route includes 'collection' and showSearch is true
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]); // Add showSearch to the dependencies

  return (
    visible ? ( // Only check visible here
      <div className="mt-4 p-4 bg-white shadow-lg flex justify-center items-center">
        <div className="relative w-full max-w-md flex items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src={assets.search_icon}
            alt="Search icon"
            className="absolute left-3 h-5 w-5 text-gray-500"
          />
        </div>
      </div>
    ) : null // Return null if not visible
  );
};

export default SearchBar;
