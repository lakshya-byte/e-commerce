import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      curreny: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message || "Something went wrong!");
          }
          break;

        case "Razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
            toast.success("Order placed. Proceed with Razorpay payment!");
          } else {
            toast.error(
              responseRazorpay.data.message || "Something went wrong!"
            );
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-gray-50 min-h-screen p-8 flex flex-col lg:flex-row items-start lg:space-x-12"
    >
      {/* Left side: Delivery Information */}
      <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          DELIVERY INFORMATION
        </h2>

        <div className="space-y-4">
          {/* Name fields */}
          <div className="flex space-x-4">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First name"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last name"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Street Address */}
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* City and State */}
          <div className="flex space-x-4">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Zip Code and Country */}
          <div className="flex space-x-4">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zip Code"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side: Cart Total and Payment Method */}
      <div className="w-full lg:w-1/3 mt-8 lg:mt-0 bg-white p-8 rounded-lg shadow-md">
        {/* Cart Total */}
        <div className="mb-8">
          <CartTotal />
        </div>

        {/* Payment Method Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          PAYMENT METHOD
        </h2>

        <div className="space-y-4">
          {/* Razorpay Payment */}
          <div
            onClick={() => setMethod("Razorpay")}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
              method === "Razorpay"
                ? "bg-green-100 border-green-500"
                : "border-gray-300"
            }`}
          >
            <p className="text-lg font-medium">Razorpay</p>
            <img
              src={assets.razorpay_logo}
              alt="Razorpay Logo"
              className="w-10"
            />
          </div>

          {/* Cash on Delivery */}
          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
              method === "cod"
                ? "bg-green-100 border-green-500"
                : "border-gray-300"
            }`}
          >
            <p className="text-lg font-medium">Cash on Delivery (COD)</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
