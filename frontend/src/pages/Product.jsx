import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        const filterProducts = products.filter(
          (product) =>
            product.category === item.category &&
            product.subCategory === item.subCategory &&
            product._id !== productId
        );
        setRelatedProducts(filterProducts);
        setImage(item.image[0]);
        return;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="space-y-10">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row items-start py-10 px-4 md:px-6 space-y-6 md:space-y-0 md:space-x-8">
        {/* Sidebar with smaller product images */}
        <div className="flex md:flex-col md:space-y-4 space-x-2 md:space-x-0">
          {productData.image.map((item, index) => (
            <div
              key={index}
              onClick={() => setImage(item)}
              className={`w-20 h-20 md:w-24 md:h-32 cursor-pointer border ${
                image === item ? "border-blue-500" : "border-gray-200"
              } rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all`}
            >
              <img
                src={item}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Main display image */}
        <div className="flex-1 max-w-lg">
          <img
            src={image}
            alt="Product"
            className="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 mt-6 md:mt-0 space-y-4 text-left">
          {/* Product Name */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            {productData.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                alt="Star"
                className="h-5 w-5"
              />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="h-5 w-5" />
            <span className="ml-2 text-sm text-gray-500">(122 reviews)</span>
          </div>
          {/* price */}
          <div>
            {currency} {productData.price}
          </div>

          {/* Product Description */}
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {productData.description}
          </p>

          {/* Select Size */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">Select Size</h3>
            <div className="flex space-x-2 mt-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border rounded-md py-1 px-2 text-xs md:text-sm transition-colors ${
                    item === size
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size) {
                toast.error("please select atleast one size");
                return;
              }
              addToCart(productData._id, size);
            }}
            className="mt-6 w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Add To Cart
          </button>

          {/* Additional Info */}
          <div className="text-xs md:text-sm text-gray-600 space-y-2 mt-6">
            <p>✅ 100% Original product</p>
            <p>💵 Cash on delivery available</p>
            <p>🔄 Easy return & exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-gray-50 py-8 px-4 md:px-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <Title text1="Related " text2="Products" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              key={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Loading product details...</p>
    </div>
  );
};

export default Product;
