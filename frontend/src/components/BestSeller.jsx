import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    setBestSeller(products.slice(0, 5));
  }, [products]);

  return (
    <div>
      <div className="mb-8 text-center">
        <Title text1="BEST" text2=" SELLERS" />
      </div>
      <p className="text-center text-gray-500 text-sm md:text-base mb-8">
        Elevate your wardrobe with our best-selling pieces that combine style,
        comfort, and quality.
      </p>
      <div className="  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSeller
          .filter((item) => item.bestseller === true) // Filtering the products where bestseller is true
          .map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;

