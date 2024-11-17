import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="bg-white p-6 md:p-10">
      <div className="mb-8 text-center">
        <Title text1="Latest " text2="Collections" />
      </div>

      <p className="text-center text-gray-500 text-sm md:text-base mb-8">
        Discover our latest arrivals and find the perfect addition to your
        collection.
      </p>

      {/* Product Grid */}
      <div className="  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProducts.map((item, index) => (
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

export default LatestCollection;
