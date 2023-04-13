import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, RightSide } from "../../components";

const Layout = () => {
  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
