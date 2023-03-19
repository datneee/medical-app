import React from "react";
import { Link } from "react-router-dom";

import { BreadCrum, Meta } from "../../../components";

const SignUp = () => {
  return (
    <div>
      <Meta title="Register account" />
      <BreadCrum title="Register account" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="login-form">
            <h3 className="h3 text-center mb-3">Register</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter your firstname"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter your lastname"
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

export default SignUp;
