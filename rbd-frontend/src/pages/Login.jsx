import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { setUserDetails, setUserRole } from "../redux/UserSlice";
import axiosInstance from "../utils/AxiosInstance";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [enable, setEnable] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handelOnChange = (e) => {
    setEnable(true);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        formData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.data) {
        toast.success("Logged in sucessfully!");
        const userData = res.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userRole", userData.role);
        dispatch(setUserDetails(userData));
        dispatch(setUserRole(userData.role));
        const token = res.data.token;
        handleToken(token);
        navigate("/");
      } else {
        toast.error("try again");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Login failed");
      console.log("Error:", error);
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Login
        </h2>
        <p className="border-t border-zinc-200 mb-4"></p>
        <form onSubmit={handleSubmission}>
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
          <Link to={"/register"}>
            <span className="text-zinc-400 mb-2 hover:text-blue-500 action:text-blue-600">
              Dont have an account?
            </span>
          </Link>
          <button
            type="submit"
            className="w-full bg-indigo-600 mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
