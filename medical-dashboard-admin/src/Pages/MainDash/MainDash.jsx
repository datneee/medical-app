import React from "react";
import { Cards, Table, Meta, BreadCrum } from "../../components";
import {BsBoxArrowRight} from 'react-icons/bs'
import "./MainDash.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAction } from "../../redux/actions/userActions";
const MainDash = () => {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(authLogoutAction())
  }
  return (
    <div className="MainDash">
      <Meta title={"Main Dashboard"} />
      <div className="d-flex align-items-center justify-content-between">
        <h1>Dashboard</h1>
        <div style={{paddingRight: "5rem"}} className="d-flex align-items-center gap-10">
          <h3><span style={{color: "#788097"}}>ADMIN:</span> {user?.fullName}</h3>
          <BsBoxArrowRight onClick={handleLogOut} style={{fontSize: "32px", marginLeft: "4px", cursor: "pointer"}}/>
        </div>
      </div>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
