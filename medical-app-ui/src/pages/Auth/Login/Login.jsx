import React from "react";
import { Link } from "react-router-dom";

import styles from "./Login.scss";
import { BreadCrum, Meta } from "../../../components";

const Login = () => {
  return (
    <div>
      <Meta title="Login my account" />
      <BreadCrum title="Login my account" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="login-form">
            <h3 className="h3 text-center mb-3">Login</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
              </div>
              <div>
                <Link to="/auth/forgot-password">Forgot Password ?</Link>
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button className="button btn-2">Login</button>
                  <Link to="/auth/sign-up" className="">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
