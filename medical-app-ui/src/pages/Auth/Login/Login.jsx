import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgSpinnerTwo } from "react-icons/cg";

import styles from "./Login.scss";
import { BreadCrum, Meta } from "../../../components";
import { login } from "../../../redux/actions/userActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const handleLogin = async () => {
    dispatch(login({ username, password }, navigate));
  };
  useEffect(() => {}, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Meta title="Login my account" />
      <BreadCrum title="Login my account" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="login-form">
            <h3 className="h3 text-center mb-3">Login</h3>
            <form action="" className="d-flex flex-column gap-15">
              <div>
                <input
                  onChange={(event) => setUsername(event.target.value.trim())}
                  type="text"
                  name="text"
                  placeholder="Enter your username"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  onChange={(event) => setPassword(event.target.value.trim())}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
              </div>
              <div>
                <Link to="/auth/forgot-password">Forgot Password ?</Link>
                <div className="d-flex gap-15 flex-column align-items-center justify-content-center">
                  <button
                    className="button btn-2"
                    type="button"
                    disabled={user?.loading && true}
                    onClick={handleLogin}
                  >
                    <div className="but-3">
                      {user?.loading && (
                        <CgSpinnerTwo className={"loading-search"} />
                      )}
                      <p>Login</p>
                    </div>
                  </button>
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
