import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgSpinnerTwo } from "react-icons/cg";

import { BreadCrum, Meta } from "../../../components";
import styles from "./ForgotPassword.scss";
import { resetPassword } from "../../../redux/actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const handleResetPassword = () => {
    dispatch(resetPassword(email, navigate));
  };
  return (
    <div>
      <Meta title="Forgot Your Password" />
      <BreadCrum title="Forgot Your Password" />
      <div className="forgotPassword-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="forgotPassword-form">
            <h3 className="h3 text-center mb-3">Forgot Your Password</h3>
            {user?.success && (
              <p className="text-notify text-center mt-2 mb-3">
                Your password has been changed, please check your email !
              </p>
            )}

            <form action="" className="d-flex flex-column gap-15">
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </div>
              <div>
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button
                    disabled={user?.loading && true}
                    type="button"
                    onClick={handleResetPassword}
                    className="button btn-2"
                  >
                    <div className="but-3">
                      {user?.loading && (
                        <CgSpinnerTwo className={"loading-search"} />
                      )}
                      <p>Submit</p>
                    </div>
                  </button>
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
