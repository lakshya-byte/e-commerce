import React from 'react';
import { assets } from '../assets/admin_assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white text-black shadow-md fixed top-0 left-0 right-0 z-20">
      <img src={assets.logo} alt="Logo" className="w-32 h-auto" />
      <button 
        onClick={() => setToken("")} 
        className="bg-black text-white border border-black px-4 py-2 rounded-md hover:bg-white hover:text-black transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
