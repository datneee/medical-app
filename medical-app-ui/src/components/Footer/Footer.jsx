import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSubcription } from "../../redux/actions/userActions";

const Footer = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const handleSubcription = () => {
    if (
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
        email
      )
    ) {
      dispatch(fetchSubcription(email));
    } else {
      alert("Email không hợp lệ !");
    }
  };
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row d-flex align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="" />
                <h2 className="mb-0 text-white" style={{ fontSize: "26px" }}>
                  Đăng ký để nhận thông báo mới nhất
                </h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control py-2"
                  placeholder="Your Email Address ..."
                  aria-label="Your Email Address ..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  <button onClick={handleSubcription} className="btn button">
                    Đăng ký
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white">
                  <div className="text-white py-2 mb-1">
                    Address: Nguyen Xa, Ha Noi, Viet Nam
                  </div>
                  <div className="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Email:</span>
                    <a href="mailto:medicalapp@gmail.com">
                      medicalapp@gmail.com
                    </a>
                  </div>

                  <div className="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Facebook:</span>
                    <a href="www.fb.me/ddat/pv01">www.fb.me/ddat/pv01</a>
                  </div>
                  <div className="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Instagram:</span>
                    <a href="https://www.instagram.com/datnull/">
                      https://www.instagram.com/datnull/
                    </a>
                  </div>
                </address>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div>
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-2 mb-1">Private Policy</Link>
                  <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                  <Link className="text-white py-2 mb-1">Teams of Service</Link>
                  <Link to={"/blog"} className="text-white py-2 mb-1">Blogs</Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div>
                <div className="footer-links d-flex flex-column">
                  <Link to={"/about"} className="text-white py-2 mb-1">About Us</Link>
                  <Link className="text-white py-2 mb-1">Faq</Link>
                  <Link to={"/contact"} className="text-white py-2 mb-1">Contact</Link>
                  <Link className="text-white py-2 mb-1">Size Chart</Link>
                </div>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to={"/store?category=1"} className="text-white py-2 mb-1">Chăm sóc sắc đẹp</Link>
                <Link to={"/store?category=2"} className="text-white py-2 mb-1">Chăm sóc cá nhân</Link>
                <Link to={"/store?category=3"} className="text-white py-2 mb-1">Thiết bị y tế</Link>
                <Link to={"/store?category=5"} className="text-white py-2 mb-1">Thuốc</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}: Powered by Developer
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
