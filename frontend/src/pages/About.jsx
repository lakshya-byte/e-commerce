import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="bg-white text-black w-full max-w-5xl mx-auto py-20 px-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-14 text-gray-900">
        ABOUT US
      </h1>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center mb-16 md:space-x-12 space-y-10 md:space-y-0">
        {/* Left Side - Image */}
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full md:w-1/2 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300"
        />

        {/* Right Side - Text */}
        <div className="md:w-1/2 space-y-6 text-gray-700">
          <p className="leading-relaxed text-lg">
            Welcome to our company! We are dedicated to providing top-quality
            services and products tailored to meet the unique needs of each
            client. Our team of passionate professionals is driven by a
            commitment to excellence and customer satisfaction.
          </p>
          <p className="leading-relaxed text-lg">
            We believe in building strong, lasting relationships with our
            clients. Our expertise and attention to detail ensure that we
            deliver beyond expectations every time.
          </p>
          <b className="block text-xl font-semibold text-gray-900 mt-6">
            Our Mission
          </b>
          <p className="leading-relaxed text-lg">
            Our mission is to empower individuals and businesses by delivering
            innovative solutions and exceptional service. We strive to inspire
            trust, foster growth, and make a positive impact in the community we
            serve.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold mb-10 text-gray-900">
          WHY CHOOSE US
        </h1>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition hover:bg-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800">
              Quality Assurance
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our commitment to quality is unwavering. Every product or service
              we offer goes through rigorous checks to ensure top standards.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition hover:bg-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800">
              Customer Focused
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our clients are our top priority. We work closely with you to
              understand your needs and deliver solutions that are both
              effective and efficient.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md transition hover:bg-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800">
              Experienced Team
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our team is composed of skilled professionals with a wealth of
              experience in their respective fields, ensuring you receive expert
              guidance and support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
