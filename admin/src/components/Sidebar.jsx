import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white shadow-md flex flex-col p-6 space-y-6 md:w-52 lg:w-64 fixed top-16 left-0 z-10">
      <div className="flex items-center space-x-3 mb-8">
        <img
          src={assets.logo} // Add your logo here
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <p className="text-2xl font-semibold">Admin Panel</p>
      </div>

      <div className="space-y-4">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300 ${
              isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300"
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
          <p className="text-lg">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300 ${
              isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300"
            }`
          }
        >
          <img src={assets.order_icon} alt="List Icon" className="w-6 h-6" />
          <p className="text-lg">List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300 ${
              isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300"
            }`
          }
        >
          <img src={assets.order_icon} alt="Orders Icon" className="w-6 h-6" />
          <p className="text-lg">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
