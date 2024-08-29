import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidenav></Sidenav>
      <div className="ml-16 pt-16">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
