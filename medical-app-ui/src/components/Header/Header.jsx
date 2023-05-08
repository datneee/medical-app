import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { BsSearch, BsChatLeftDots } from "react-icons/bs";
import { HiLogout } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./Header.scss";
import Dropdown from "../Dropdown/Dropdown";
import InputGroup from "../InputGroup/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAction, getCartItem } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.service?.categories);
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user;
  const cart = auth?.cart;
  const handleLogout = () => {
    dispatch(authLogoutAction());
  };
  useEffect(() => {
    dispatch(getCartItem(user?.id));
  }, [cart?.length]);
  return (
    <header className="header-wrapper">
      <div className="header header-upper py-3">
        <div className="container container-xxl">
          <div className="row flex-alight-center align-items-center">
            <div className="col-2">
              <h1>
                <Link to="/" className="text-white logo">
                  Medical Shop
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <InputGroup />
            </div>
            <div className="col-5">
              <ul className="mb-0 header-upper-links d-flex align-items-center justify-content-between">
                <li className="header-upper-links-item">
                  <Link
                    to="/chat"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <BsChatLeftDots />
                    <p>Chats</p>
                  </Link>
                </li>
                <li className="header-upper-links-item">
                  <Link
                    to="ordered"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FiShoppingBag />
                    <p>Đơn hàng của tôi</p>
                  </Link>
                </li>
                {user ? (
                  <li
                    style={{
                      fontSize: 18,
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
                  <li className="header-upper-links-item">
                    <Link
                      to="auth/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src="/images/user.svg" alt="" />
                      <p style={{ lineHeight: 1.2 }}>
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </li>
                )}

                <li className="header-upper-links-item">
                  <Link to="cart" className="cart text-white">
                    <img src="/images/cart.svg" alt="" />
                    <div className="">
                      <span className="badge cart-quantity badge-warning bg-white text-dark">
                        {cart?.length || 0}
                      </span>
                      {/* <p>
                        {total?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p> */}
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
                  <Dropdown categories={categories} />
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
