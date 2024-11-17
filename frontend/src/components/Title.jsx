import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Title Text */}
      <p className="text-6xl sm:text-5xl font-semibold text-gray-800">
        {text1} <span className="text-blue-600">{text2}</span>
      </p>

      {/* Divider Line */}
      <div className="w-12 sm:w-32 h-[1px] sm:h-[2px] bg-gray-700"></div>
    </div>
  );
};

export default Title;
