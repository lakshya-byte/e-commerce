import React, { useContext, useState } from "react"; // Import useState for managing menu visibility
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const {
    setShowSearch,
    showSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black shadow-md p-4 m-2 flex justify-around items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
        />
      </div>

      {/* Menu Icon for Small Screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <img src={assets.menu_icon} alt="Menu" className="h-6" />
        </button>
      </div>

      {/* Navigation Links for Large Screens */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-500 transition duration-200 text-lg ${
                // Added text-lg for larger text
                isActive ? "text-gray-800 border-b-2 border-black" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `hover:text-gray-500 transition duration-200 text-lg ${
                // Added text-lg for larger text
                isActive ? "text-gray-800 border-b-2 border-black" : ""
              }`
            }
          >
            Collection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-500 transition duration-200 text-lg ${
                // Added text-lg for larger text
                isActive ? "text-gray-800 border-b-2 border-black" : ""
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-gray-500 transition duration-200 text-lg ${
                // Added text-lg for larger text
                isActive ? "text-gray-800 border-b-2 border-black" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Icons for Large Screens */}
      <div className="hidden md:flex space-x-4 items-center relative">
        <img
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon}
          alt="Search"
          className="h-6 cursor-pointer"
        />
        <div className="group relative">
          {" "}
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
          />
          {/* dropdown menu */}
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            {token && (
              <div className="flex flex-col gap-2 w-36 py-3 px-5">
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        <NavLink to={"/cart"} className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="h-6 cursor-pointer"
          />
          <p className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {getCartCount()}
          </p>
        </NavLink>
      </div>

      {/* Responsive Menu for Small Screens with Animation */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-md p-4 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-500 transition duration-200 text-lg ${
                  // Added text-lg for larger text
                  isActive ? "text-gray-800" : ""
                }`
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `hover:text-gray-500 transition duration-200 text-lg ${
                  // Added text-lg for larger text
                  isActive ? "text-gray-800" : ""
                }`
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-gray-500 transition duration-200 text-lg ${
                  // Added text-lg for larger text
                  isActive ? "text-gray-800" : ""
                }`
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-gray-500 transition duration-200 text-lg ${
                  // Added text-lg for larger text
                  isActive ? "text-gray-800" : ""
                }`
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-panel"
              className="hover:text-gray-500 transition duration-200 text-lg" // Added text-lg for larger text
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Admin Panel
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Icons for Small Screens (Outside the Menu) */}
      <div className="md:hidden flex space-x-4 items-center">
        <img
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon}
          alt="Search"
          className="h-6 cursor-pointer"
        />
        <Link to={"/login"}>
          <img
            src={assets.profile_icon}
            alt="Profile"
            className="w-5 cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </Link>
        <NavLink to={"/cart"} className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="h-6 cursor-pointer"
          />
          <p className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {getCartCount()}
          </p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
