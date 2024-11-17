import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { delivery_fee, currency, getCartAmount } = useContext(ShopContext);
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">CART TOTAL</h2>
      </div>
      <div className="space-y-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-lg">
          <p className="font-medium text-gray-700">Subtotal</p>
          <p className="text-gray-900">{currency}{getCartAmount()}.00</p>
        </div>
        
        <hr className="border-t-2 border-gray-200" />

        {/* Shipping Fee */}
        <div className="flex justify-between items-center text-lg">
          <p className="font-medium text-gray-700">Shipping Fee</p>
          <p className="text-gray-900">{currency}{delivery_fee}</p>
        </div>
        
        <hr className="border-t-2 border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-2xl">
          <p>Total</p>
          <p className="text-gray-900">
            {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
