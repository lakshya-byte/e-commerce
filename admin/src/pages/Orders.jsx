import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 border border-gray-200 flex flex-col space-y-4"
          >
            {/* Order Detail Box */}
            <div className="flex flex-wrap justify-between w-full space-x-4">
              {/* Customer Information Box */}
              <div className="flex-1 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer
                </h3>
                <b className="text-sm text-gray-600">
                  <strong>Name:</strong> {order.address.firstName}{" "}
                  {order.address.lastName}
                </b>
                <b className="text-sm text-gray-600">
                  <strong>Phone:</strong> {order.address.phone}
                </b>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {order.address.street},{" "}
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              {/* Payment Information Box */}
              <div className="flex-1 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Payment</h3>
                <p className="text-sm text-gray-600">
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  {order.payment ? "Completed" : "Pending"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total:</strong> {currency}
                  {order.amount}
                </p>
              </div>
            </div>

            {/* Order Items Box */}
            <div className="w-full flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Items</h3>
              {order.items.map((item, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {item.name} x {item.quantity}{" "}
                  <span className="text-gray-400">({item.size})</span>
                </div>
              ))}
            </div>

            {/* Status and Date Box */}
            <div className="w-full flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Status
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {order.payment ? "Paid" : "Not Paid"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-full bg-gray-100 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
