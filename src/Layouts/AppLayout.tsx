import React from "react";
import Navbar from "../components/common/NavBar";
import { Outlet } from "react-router-dom";
import Heading from "../components/common/Heading";

const AppLayout: React.FC = () => {
  return (
    <>
      <Heading />
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-4 ml-64">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
