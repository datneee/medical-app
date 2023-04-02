import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import styles from "./Header.scss";
import Dropdown from "../Dropdown/Dropdown";
import InputGroup from "../InputGroup/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAction } from "../../redux/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authLogoutAction());
  };

  return (
    <header className="header-wrapper">
      <div className="header header-upper py-3">
        <div className="container container-xxl">
          <div className="row flex-alight-center align-items-center">
            <div className="col-2">
              <h1>
                <Link to="/" className="text-white logo">
                  Medical app
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <InputGroup />
            </div>
            <div className="col-5">
              <ul className="mb-0 header-upper-links d-flex align-items-center justify-content-between">
                <li>
                  <Link
                    to="/"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/compare.svg" alt="" />
                    <p>Reload</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="product-cared"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/wishlist.svg" alt="" />
                    <p>Cared</p>
                  </Link>
                </li>
                {user ? (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <p style={{ fontSize: "18px", color: "#fff" }}>
                      {user.fullName}
                    </p>
                    <Link
                      onClick={handleLogout}
                      to="#"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <HiLogout style={{ fontSize: "20px" }} />
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="auth/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src="/images/user.svg" alt="" />
                      <p>
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart.svg" alt="" />
                    <div className="d-flex flex-column">
                      <span className="badge badge-warning bg-white text-dark">
                        0
                      </span>
                      <p>$ 500</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center">
                <div>
                  <Dropdown />
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
