import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BreadCrum, Meta } from "../../../components";
import styles from "./SignUp.scss";
import { useState } from "react";
import { red } from "@mui/material/colors";
import { CgSpinnerTwo } from "react-icons/cg";
import { registration } from "../../../redux/actions/userActions";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfim, setPasswordConfim] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const checkEmail = true;
  const handleSignUp = async () => {
    dispatch(
      registration(
        {
          username: username,
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
          password: password,
          avatar: "avatar.jpg",
        },
        navigate
      )
    );
    if (user?.success) {
      clearFrom();
    }
  };
  const clearFrom = () => {
    setAddress("");
    setEmail("");
    setFullName("");
    setPassword("");
    setPasswordConfim("");
    setPhoneNumber("");
    setUsername("");
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Meta title="Register account" />
      <BreadCrum title="Register account" />
      <div className="signup-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="signup-form">
            <h3 className="h3 text-center mb-3">Register</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div>
                <div>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="form-control"
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    name="fullName"
                    placeholder="Enter your fullName"
                    className="form-control"
                  />
                </div>
              </div>
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                {!checkEmail && (
                  <p style={{ color: "red", fontSize: "16px", margin: 4 }}>
                    Email invalid !
                  </p>
                )}
              </div>
              <div>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="form-control"
                />
              </div>
              <div>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="form-control"
                />
              </div>

              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPasswordConfim(e.target.value)}
                  type="password"
                  name="passwordConfirm"
                  placeholder="Enter your password again"
                  className="form-control"
                />
                {password != passwordConfim && (
                  <p style={{ color: "red", fontSize: "16px", margin: 4 }}>
                    Mật khẩu không khớp !
                  </p>
                )}
              </div>
              <div>
                {user?.message && (
                  <p style={{ color: "orange" }}>{user?.message}</p>
                )}
              </div>
              <div>
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button
                    type="button"
                    className="button btn-2 but-3"
                    onClick={handleSignUp}
                    disabled={user?.success}
                  >
                    {user?.loading && (
                      <CgSpinnerTwo className={"loading-search"} />
                    )}
                    Signup
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

export default SignUp;
