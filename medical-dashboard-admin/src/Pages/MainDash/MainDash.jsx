import React from "react";
import { Cards, Table, Meta, BreadCrum } from "../../components";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <Meta title={"Main Dashboard"} />
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
