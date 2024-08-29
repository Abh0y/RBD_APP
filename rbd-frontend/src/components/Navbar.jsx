import React from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, setUserDetails, setUserRole } from "../redux/UserSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const con = window.confirm("Are you sure you want to logOut?");
    if (con) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("user");
      dispatch(setUserDetails(""))
      dispatch(setUserRole(""))
      dispatch(logout())
      toast.success("Logged out sucessfully!");
      navigate("/login");
    }
  };
  return (
    <div className="fixed bg-blue-400 p-4 w-full shadow-md z-10">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Brand</div>

        <div className="flex flex-grow mx-4 max-w-lg">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-500" />
            </span>
          </div>
        </div>

        <div className="flex items-center pr-6 gap-6">
          <button className="text-white hover:text-gray-300">
            <GoBell className="text-xl" size={25} />
          </button>
          <button
            className="text-white hover:text-gray-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-xl" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
