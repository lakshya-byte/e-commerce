import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, products, currency, addToCart, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, size, newQuantity); // Update the cart quantity
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-8">
      {/* Title */}
      <div className="text-center mb-12">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items Section */}
      <div className="max-w-full mx-auto space-y-8">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between w-full border-b border-gray-200"
            >
              {/* Product Image */}
              <div className="w-24 h-28 mr-3">
                <img
                  src={productData?.image[0]}
                  alt={productData?.name}
                  className="w-full h-full object-cover rounded-md shadow-sm"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {productData?.name}
                  </h3>

                  {/* Product Price */}
                  <p className="text-xl font-semibold text-gray-900">
                    {currency}
                    {productData?.price}
                  </p>
                </div>

                {/* Product Size and Quantity */}
                <div className="flex justify-between mb-2">
                  {/* Product Size */}
                  <p className="text-xl text-gray-600">Size: {item.size}</p>

                  {/* Centering Quantity and Price */}
                  <div className="flex justify-center items-center w-full space-x-4">
                    {/* Product Quantity */}
                    <div className="flex items-center">
                      <label className="text-sm font-medium text-gray-600 mr-2">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          // Update quantity only if it’s a valid number
                          if (!isNaN(newQuantity) && newQuantity > 0) {
                            handleQuantityChange(
                              item._id,
                              item.size,
                              newQuantity
                            );
                          }
                        }}
                        className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* Product Price */}
                    <p className="text-xl font-semibold text-gray-900">
                      {currency}
                      {productData?.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <div>
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Remove"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total Section */}
      <div className="mt-8">
        <div className="flex justify-end">
          <div className="w-[300px]">
            <CartTotal />
            <div className="mt-4">
              <button
                onClick={() => navigate("/place-order")}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
