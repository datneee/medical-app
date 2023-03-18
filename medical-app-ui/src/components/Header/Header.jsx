import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styles from "./Header.scss";
import Dropdown from "../Dropdown/Dropdown";
import InputGroup from "../InputGroup/InputGroup";

const Header = () => {
  return (
    <header className="header-wrapper">
      <div class="header-top-strip py-3">
        <div class="container--xxl">
          <div
            style={{ margin: 0 }}
            class="row w-100 d-flex align-items-center justify-content-between"
          >
            <div class="col-6">
              <p class="text-white mb-0">
                Free Shipping Over 100$ & Free Returns
              </p>
            </div>
            <div class="col-5">
              <p class="text-end text-white mb-0">
                Hotline:
                <a class="text-white" href="tel: +84 978315545">
                  0978315545
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="header header-upper py-3">
        <div class="container container-xxl">
          <div class="row flex-alight-center align-items-center">
            <div class="col-2">
              <h1>
                <Link class="text-white">Medical app</Link>
              </h1>
            </div>
            <div class="col-5">
              <InputGroup />
            </div>
            <div class="col-5">
              <ul class="mb-0 header-upper-links d-flex align-items-center justify-content-between">
                <li>
                  <Link class="d-flex align-items-center gap-10 text-white">
                    <img src="/images/compare.svg" alt="" />
                    <p>Reload</p>
                  </Link>
                </li>
                <li>
                  <Link class="d-flex align-items-center gap-10 text-white">
                    <img src="/images/wishlist.svg" alt="" />
                    <p>Cared</p>
                  </Link>
                </li>
                <li>
                  <Link class="d-flex align-items-center gap-10 text-white">
                    <img src="/images/user.svg" alt="" />
                    <p>
                      Log in <br /> My Account
                    </p>
                  </Link>
                </li>
                <li>
                  <Link class="d-flex align-items-center gap-10 text-white">
                    <img src="/images/cart.svg" alt="" />
                    <div class="d-flex flex-column">
                      <span class="badge badge-warning bg-white text-dark">
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
      <div class="header-bottom py-3">
        <div class="container-xxl">
          <div class="row">
            <div class="col-12">
              <div class="menu-bottom d-flex align-items-center">
                <div>
                  <Dropdown />
                </div>
                <div class="menu-links">
                  <div class="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Our store</NavLink>
                    <NavLink to="/">Blogs</NavLink>
                    <NavLink to="/">Contact</NavLink>
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
