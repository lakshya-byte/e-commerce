import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken, token, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("sign up successful");
        } else {
          console.log(response);

          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(response);

          toast.success("sign in successful");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      className="bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-lg text-black"
      onSubmit={onSubmitHandler}
    >
      {/* Header with State */}
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold">{currentState}</p>
        <hr className="mt-2 border-gray-300" />
      </div>

      {/* Input Fields */}
      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:border-black"
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        required
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:border-black"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        required
        className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:border-black"
      />

      {/* Links and Account Toggle */}
      <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
        <p className="hover:underline cursor-pointer">Forget Your Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="hover:underline cursor-pointer text-black"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="hover:underline cursor-pointer text-black"
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
