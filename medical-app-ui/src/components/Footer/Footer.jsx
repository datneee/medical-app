import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row d-flex align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="" />
                <h2 className="mb-0 text-white">Sign Up for News Letter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Your Email Address ..."
                  aria-label="Your Email Address ..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  <button className="btn button">Subscribe</button>
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
                  <Link className="text-white py-2 mb-1">Blogs</Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div>
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-2 mb-1">About Us</Link>
                  <Link className="text-white py-2 mb-1">Faq</Link>
                  <Link className="text-white py-2 mb-1">Contact</Link>
                  <Link className="text-white py-2 mb-1">Size Chart</Link>
                </div>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">HeadPhones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watch</Link>
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
