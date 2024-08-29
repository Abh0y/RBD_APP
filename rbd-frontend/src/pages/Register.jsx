import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enable, setEnable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const isLoggedin = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handelOnChange = (e) => {
    setEnable(true);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.data.message) {
        console.log("User registered successfully:", res.data);
        if (isLoggedin) {
          navigate("/manageuser");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          {isLoggedin ? "Create User" : "Signup"}
        </h2>
        <p className="border-t border-zinc-200 mb-4"></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handelOnChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handelOnChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handelOnChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
            {enable && (
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute inset-y-0 mt-7 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5  text-gray-300" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-300" />
                )}
              </button>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="role"
              onChange={handelOnChange}
            >
              <option className="text-gray-400">Select Role</option>
              {(userRole === "SuperAdmin" || userRole === "Admin") && (
                <>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Admin">Admin</option>
                </>
              )}
              <option value="Manager">Manager</option>
              <option value="NormalUser">Normal User</option>
            </select>
          </div>
          <Link to={"/login"}>
            <span className="text-zinc-400 mb-2 hover:text-blue-500 action:text-blue-600">
              Already have an account?
            </span>
          </Link>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 mt-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoggedin ? "Save" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
