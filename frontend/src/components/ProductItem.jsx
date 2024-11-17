import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    // Add target="_blank" to open the product link in a new tab
    <Link to={`/product/${id}`} >
      <div
      // onClick={window.scrollTo(0, 0)}
        key={id}
        className="cursor-pointer bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        <div className="w-full h-80 overflow-hidden rounded-md mb-4 flex items-center justify-center">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover object-top transform scale-[1]"
          />
        </div>
        <p className="text-gray-800 font-semibold text-lg">{name}</p>
        <div className="flex items-center space-x-1 text-gray-600 mt-2">
          <span className="text-sm">{currency}</span>
          <span className="text-base font-bold">{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
