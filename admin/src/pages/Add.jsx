import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const addSize = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
    console.log(sizes);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents the default form submission
    try {
      const formData = new FormData();

      // Append images conditionally
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      // Append other fields
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to JSON

      // Perform POST request
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }

      // Log response for debugging
      // console.log("Form submission successful:", response.data);
    } catch (error) {
      // Catch and log any error
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="max-w-xl mx-auto p-6 bg-white text-gray-800 shadow-md rounded-lg">
        <p className="text-xl font-semibold text-gray-900 mb-4">Upload Image</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <label
            htmlFor="image1"
            className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-lg p-3 hover:border-gray-400 transition"
          >
            <img
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt="Image upload"
              className="w-14 h-14 object-contain"
            />
            <input
              onChange={(e) => {
                setImage1(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image1"
              hidden
            />
          </label>
          <label
            htmlFor="image2"
            className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-lg p-3 hover:border-gray-400 transition"
          >
            <img
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt="Image upload"
              className="w-14 h-14 object-contain"
            />
            <input
              onChange={(e) => {
                setImage2(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image2"
              hidden
            />
          </label>
          <label
            htmlFor="image3"
            className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-lg p-3 hover:border-gray-400 transition"
          >
            <img
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt="Image upload"
              className="w-14 h-14 object-contain"
            />
            <input
              onChange={(e) => {
                setImage3(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image3"
              hidden
            />
          </label>
          <label
            htmlFor="image4"
            className="cursor-pointer flex justify-center items-center border border-gray-300 rounded-lg p-3 hover:border-gray-400 transition"
          >
            <img
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt="Image upload"
              className="w-14 h-14 object-contain"
            />
            <input
              onChange={(e) => {
                setImage4(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image4"
              hidden
            />
          </label>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Type here"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Product Description
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Product Category
            </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Sub Category
            </p>
            <select
              onChange={(e) => setsubCategory(e.target.value)}
              value={subCategory}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Product Price
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Product Sizes
          </p>
          <div className="grid grid-cols-5 gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                onClick={() => addSize(size)}
                key={size}
                className={`p-2 text-center border border-gray-300 rounded cursor-pointer transition 
        ${
          sizes.includes(size)
            ? "bg-black text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}
              >
                <p className="text-sm font-medium">{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <input
            checked={bestseller}
            onChange={() => {
              setBestseller((prev) => !prev);

              // console.log(bestseller);
            }}
            type="checkbox"
            id="bestseller"
            className="mr-2 cursor-pointer"
          />
          <label
            htmlFor="bestseller"
            className="text-sm text-gray-700 font-semibold cursor-pointer"
          >
            Add to Bestseller
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Add;
