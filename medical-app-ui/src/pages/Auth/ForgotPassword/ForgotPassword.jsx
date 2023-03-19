import React from "react";
import { Link } from "react-router-dom";

import { BreadCrum, Meta } from "../../../components";

import styles from "./ForgotPassword.scss";

const ForgotPassword = () => {
  return (
    <div>
      <Meta title="Forgot Your Password" />
      <BreadCrum title="Forgot Your Password" />
      <div className="forgotPassword-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="forgotPassword-form">
            <h3 className="h3 text-center mb-3">Forgot Your Password</h3>
            <p className="text-notify text-center mt-2 mb-3">
              We will send you an email redirect to reset your password
            </p>
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
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button className="button btn-2">Submit</button>
                  <Link to="/auth/login" className="">
                    Login
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

export default ForgotPassword;
