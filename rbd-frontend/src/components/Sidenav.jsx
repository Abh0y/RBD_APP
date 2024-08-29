import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCardMembership } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const userRole = useSelector((state) => state.user.userRole);
 
  const location = useLocation().pathname;
  useEffect(() => {
    setActiveItem(location);
  }, [location]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`fixed top-16 left-0 h-full transition-all duration-300 ease-in-out bg-blue-400 text-white z-5 ${
        isOpen ? "w-48" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4 mt-4">
        <h1 className="text-xl font-bold">
          <span className="flex items-center gap-2 transition-opacity duration-300">
            <FaListUl className="mt-1 leading-none" />
            {isOpen && <span className="leading-none">Menu</span>}
          </span>
        </h1>
      </div>
      <nav className="flex flex-col gap-2 mt-6 ">
        <ul>
          <Link to={"/"}>
            <li
              className={`p-4 hover:bg-white hover:text-black ${
                activeItem === "/" ? "bg-white text-black " : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <LuLayoutDashboard className="mt-1 leading-none" />
                <span
                  className={`transition-opacity duration-300 leading-none ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {isOpen && "Dashboard"}
                </span>
              </span>
            </li>
          </Link>
          {(userRole === "SuperAdmin" || userRole === "Admin") && (
            <Link to={"/manageuser"}>
              <li
                className={`p-4 hover:bg-white hover:text-black ${
                  activeItem === "/manageuser" ? "bg-white text-black" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  <MdOutlineCardMembership className="mt-1 leading-none" />
                  <span
                    className={`transition-opacity duration-300 leading-none ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {isOpen && "Manage Users"}
                  </span>
                </span>
              </li>
            </Link>
          )}
          <Link to={"/profile"}>
            <li
              className={`p-4 hover:bg-white hover:text-black ${
                activeItem === "/profile" ? "bg-white text-black" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <CgProfile className="mt-1 leading-none" />
                <span
                  className={`transition-opacity duration-300 leading-none ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {isOpen && "Profile"}
                </span>
              </span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
