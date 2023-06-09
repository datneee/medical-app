import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);
  console.log();
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  return (
    <>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <Link to={"/"} className="logo" style={{ cursor: "pointer" }}>
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </Link>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link
                to={item.path}
                className={
                  window.location.pathname == item.path
                    ? "menuItem active"
                    : "menuItem"
                }
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span style={{ whiteSpace: "nowrap" }}>{item.heading}</span>
              </Link>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem"></div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
