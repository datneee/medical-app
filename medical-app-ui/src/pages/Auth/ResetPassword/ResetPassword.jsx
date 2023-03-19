import React from "react";
import { Link } from "react-router-dom";

import styles from "./ResetPassword.scss";
import { BreadCrum, Meta } from "../../../components";
const ResetPassword = () => {
  return (
    <div>
      <Meta title="Reset Password" />
      <BreadCrum title="Reset Password" />
      <div className="resetPassword-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="resetPassword-form">
            <h3 className="h3 text-center mb-3">Reset Password</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="form-control"
                />
              </div>
              <div>
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button className="button btn-2">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
