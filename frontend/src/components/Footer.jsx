import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10 px-6">
      {/* Main Container for Flex Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-4">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <p className="text-gray-400">
            Bringing you the best products and customer support.
          </p>
        </div>
        
        {/* Middle Section - Company Links */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg font-bold mb-3">COMPANY</h1>
          <p className="hover:text-gray-300 cursor-pointer">Home</p>
          <p className="hover:text-gray-300 cursor-pointer">About us</p>
          <p className="hover:text-gray-300 cursor-pointer">Delivery</p>
          <p className="hover:text-gray-300 cursor-pointer">Privacy policy</p>
        </div>
        
        {/* Right Section - Contact Info */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg font-bold mb-3">GET IN TOUCH</h1>
          <p className="text-gray-400">+1-000-000-0000</p>
          <p className="text-gray-400">greatstackdev@gmail.com</p>
          <p className="text-gray-400">Instagram</p>
        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

