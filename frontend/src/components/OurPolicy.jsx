import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="bg-white py-12 px-6 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Exchange Policy */}
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition hover:shadow-md bg-white">
          <img
            src={assets.exchange_icon}
            alt="Easy Exchange"
            className="w-14 h-14 mb-4"
          />
          <h1 className="text-lg font-semibold text-gray-900">
            Easy Exchange Policy
          </h1>
          <p className="text-gray-500 mt-2">
            Hassle-free exchange within 7 days
          </p>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition hover:shadow-md bg-white">
          <img
            src={assets.support_img}
            alt="Customer Support"
            className="w-14 h-14 mb-4"
          />
          <h1 className="text-lg font-semibold text-gray-900">
            24/7 Customer Support
          </h1>
          <p className="text-gray-500 mt-2">
            Available around the clock for your needs
          </p>
        </div>

        {/* Return Policy */}
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition hover:shadow-md bg-white">
          <img
            src={assets.quality_icon}
            alt="Return Policy"
            className="w-14 h-14 mb-4"
          />
          <h1 className="text-lg font-semibold text-gray-900">
            7-Day Return Policy
          </h1>
          <p className="text-gray-500 mt-2">Get a full refund within 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
