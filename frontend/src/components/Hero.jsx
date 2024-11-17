import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="bg-white m-2 border-2 border-black py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex justify-center items-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
      {/* Hero Container */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl space-y-6 sm:space-y-8 lg:space-y-0">
        {/* Hero Left Side */}
        <div className="lg:w-1/2 space-y-4 text-center lg:text-left px-2 sm:px-4">
          {/* Tagline */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Top Picks
            </p>
            <p className="text-base sm:text-lg font-bold text-gray-700 tracking-wider">
              OUR BESTSELLERS
            </p>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
            Latest Arrivals
          </h1>

          {/* Action Buttons */}
          <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4 mt-4">
            <button className="bg-black text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
              SHOP NOW
            </button>
            <button className="border-2 border-gray-300 text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg font-semibold hover:border-gray-500 hover:text-gray-700 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Right Side - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end px-2 sm:px-4">
          <img
            src={assets.hero_img}
            alt="Latest Arrivals"
            className="w-3/4 sm:w-full md:max-w-sm lg:max-w-md xl:max-w-lg rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
