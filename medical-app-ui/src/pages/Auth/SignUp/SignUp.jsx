import React from "react";
import { Link } from "react-router-dom";

import { BreadCrum, Meta } from "../../../components";
import styles from "./SignUp.scss";

const SignUp = () => {
  return (
    <div>
      <Meta title="Register account" />
      <BreadCrum title="Register account" />
      <div className="signup-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="signup-form">
            <h3 className="h3 text-center mb-3">Register</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div
                style={{ marginLeft: "-4px" }}
                className="col-12 d-flex align-items-center gap-10 w-100"
              >
                <div className="col-6">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter your firstname"
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter your lastname"
                    className="form-control"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="form-control"
                />
              </div>

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
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button className="button btn-2">Register</button>
                  <Link to="/auth/signup" className="">
                    signup
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

export default SignUp;
