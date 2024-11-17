import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col items-center bg-white text-gray-800 p-10 sm:p-20 rounded-3xl shadow-xl max-w-5xl mx-auto mt-10 space-y-10">
      {/* Header */}
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-6">
        Contact Us
      </h1>

      {/* Image */}
      <div className="w-full flex justify-center mb-10">
        <img
          src={assets.contact_img}
          alt="Contact"
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* Contact Form */}
      <form className="w-full max-w-lg space-y-6">
        {/* Name Fields */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="First Name"
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
          required
        />

        {/* Subject Field */}
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
          required
        />

        {/* Message Field */}
        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Details */}
      <div className="text-center space-y-3 mt-8 text-gray-700">
        <h2 className="text-2xl font-medium text-gray-800">Get in Touch</h2>
        <p>
          We'd love to hear from you. Feel free to reach out with any questions
          or feedback.
        </p>
        <div className="space-y-1">
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Example St, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
