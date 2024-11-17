import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      //   console.log(email, password);
      const response = await axios.post(backendUrl + `/api/user/admin`, {
        email,
        password,
      });
      console.log(response);
      // console.log(token);

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
        // console.log(error);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="bg-black text-white p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-8">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <p className="text-lg">Email Address</p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>
          <div>
            <p className="text-lg">Password</p>
            <input
              type="password"
              placeholder="your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
