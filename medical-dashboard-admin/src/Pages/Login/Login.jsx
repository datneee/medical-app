import React, { useState } from "react";
import styles from "./Login.scss";
import { BreadCrum, Meta, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userActions";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);

  const handleLoginAuth = () => {
    dispatch(login({ username, password }, navigate));
  }
  return (
    <div className="login-wrapper">
      <Meta title={"Login"} />
      {auth.loading && <Loading />}
      <div className="container-xxl mt-5">
      <div className="h-custom">
          <div className="row">
              <div className="col-12">
                <h1 style={{textAlign: "center", marginBottom: "24px"}}>LOGIN TO MEDICAL DASHBOARD</h1>
              </div>
              <div className="col-12 d-flex align-items-center login-form">
                <div className="col-8">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </div>
                <div className="col-4 d-flex align-items-center" style={{height: "100%"}}>
                    <div style={{width: "100%"}}>
                      <div className="group-control mb-4">
                        <label className="mb-2 input-label" htmlFor="email">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} size="lg" type="text" id="email" placeholder="Enter email or username ..." className="form-control input-e" />
                      </div>
                      <div className="group-control mb-4">
                        <label className="mb-2 input-label" htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} size="lg" type="password" id="password" placeholder="Enter email or password ..." className="form-control input-e" />
                      </div>
                      <button onClick={handleLoginAuth} style={{width: "100%", padding: "14px", fontSize: "20px"}} className="btn"> Đăng nhập</button>
                    </div>
                </div>
              </div>
              
          </div>  
      </div>
    </div>
    </div>
    
    
  );
};

export default Login;
