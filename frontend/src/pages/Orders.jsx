import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-8">MY ORDERS</h1>

      {/* Orders List */}
      <div className="space-y-8">
        {orderData.slice(0, 4).map((item, index) => {
          console.log(item);

          return (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-gray-100 p-6 rounded-lg shadow-md"
            >
              {/* Left Side: Product Image and Info */}
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24  object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="space-y-1">
                  <p className="text-xl font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-gray-500">Size: {item.size}</p>
                </div>
              </div>

              {/* Center Section: Status */}
              <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-8">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <p className="text-gray-600 font-medium">{item.status}</p>
              </div>

              {/* Right Side: Order Date and Track Button */}
              <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                <p className="text-gray-600">
                  Date:{" "}
                  <span className="text-black font-semibold">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="text-gray-600">
                  payment:{" "}
                  <span className="text-black font-semibold">
                    {item.paymentMethod}
                  </span>
                </p>
                <button className="mt-2 lg:mt-0 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
