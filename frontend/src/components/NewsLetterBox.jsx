import React from "react";

const NewsLetterBox = () => {
  return (
    <div className="bg-gray-100 p-10 rounded-sm shadow-md text-center max-w-screen-lg mx-auto ">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Subscribe Now & Get 20% Off
      </h1>
      <p className="text-gray-600 mb-6">
        Join our newsletter to stay updated with exclusive offers and the latest
        news.
      </p>

      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 outline-none text-gray-700"
        />
        <button
          onClick={() => alert("subscribed to news letter")}
          className="bg-gray-800 text-white px-6 py-2 font-semibold hover:bg-gray-700 transition"
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default NewsLetterBox;
