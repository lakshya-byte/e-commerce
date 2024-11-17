import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const confirmDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(productId);
      }
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-2xl font-semibold mb-4">All Products List</p>

      {/* Table Headers */}
      <div className="grid grid-cols-5 gap-4 py-2 border-b-2 border-gray-300 font-bold text-gray-600">
        <div>Image</div>
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      {/* Product List */}
      <div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition"
          >
            <div>
              <img
                src={item.image[0]}
                alt={item.name}
                className="h-24 w-20 object-cover rounded-md shadow-sm"
              />
            </div>
            <div className="text-gray-700 font-medium ">{item.name}</div>
            <div className="text-gray-600">{item.category}</div>
            <div className="text-green-600 font-semibold">
              {currency}
              {item.price}
            </div>
            <div className="border-2 border-red-400 rounded-full h-10 w-10 flex items-center justify-center text-red-500 cursor-pointer hover:text-red-700 hover:border-red-700 transition">
              <MdDelete onClick={() => confirmDelete(item._id)} size={24} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
