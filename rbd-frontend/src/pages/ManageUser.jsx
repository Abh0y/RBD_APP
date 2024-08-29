import React, { useEffect, useState } from "react";
import { MdEditDocument, MdOutlineDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ManageUser = () => {
  const [userData, setUserData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [formData, setFormData] = useState({});

  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_APP_BASE_URL}/userdata/users`
      );

      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        console.log("No data fetched!");
      }
    } catch (error) {
      console.log(error, "Error fetching data!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    setEditModal(true);
    setEditId(id);
    const data = userData.find((user) => user._id === id);
    setFormData(data);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/userdata/editusers/${editId}`,
        formData
      );
      fetchData();
      setEditModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axiosInstance.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/userdata/deleteuser/${id}`
        );

        if (res.data.success) {
          toast.success("User deleted successfully!");
          fetchData();
        } else {
          toast.error("Failed to delete user!");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user!");
      }
    }
  };
  return (
    <>
      <div className="p-8 overflow-x-auto bg-gray-100">
        {userRole === "SuperAdmin" && (
          <div className="p-4 shadow-md bg-white  rounded-md">
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/register")}
            >
              Create User
            </button>
          </div>
        )}
        <div className="mt-2 p-4 shadow-md bg-white h-[490px] rounded-md">
          <div className="h-full overflow-auto rounded-md py-2">
            <table className="min-w-full bg-white items-center">
              <thead className="border-b rounded-md border-gray-400 font-semibold">
                <tr>
                  <th className="px-6 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sr No.
                  </th>
                  <th className="px-6 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.createdAt.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.role}
                      </td>
                      <td className="py-4 pr-6 whitespace-nowrap text-right text-sm ">
                        <div className="space-x-4 justify-center">
                          <button
                            onClick={() => handleEdit(user._id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <MdEditDocument size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-blue-600 hover:text-blue-900 "
                          >
                            <MdOutlineDeleteSweep size={22} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-600"
                    >
                      Loading Data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="NormalUser">Normal User</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUser;
