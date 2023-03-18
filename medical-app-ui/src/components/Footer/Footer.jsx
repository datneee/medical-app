import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer class="py-3">
        <div class="container-xxl">
          <div class="row d-flex align-items-center">
            <div class="col-5">
              <div class="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="" />
                <h2 class="mb-0 text-white">Sign Up for News Letter</h2>
              </div>
            </div>
            <div class="col-7">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control py-2"
                  placeholder="Your Email Address ..."
                  aria-label="Your Email Address ..."
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text p-2" id="basic-addon2">
                  <button class="btn button">Subscribe</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer class="py-3">
        <div class="container-xxl">
          <div class="row">
            <div class="col-4">
              <h4 class="text-white mb-4">Contact Us</h4>
              <div>
                <address class="text-white">
                  <div class="text-white py-2 mb-1">
                    Address: Nguyen Xa, Ha Noi, Viet Nam
                  </div>
                  <div class="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Email:</span>
                    <a href="mailto:medicalapp@gmail.com">
                      medicalapp@gmail.com
                    </a>
                  </div>

                  <div class="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Facebook:</span>
                    <a href="www.fb.me/ddat/pv01">www.fb.me/ddat/pv01</a>
                  </div>
                  <div class="text-white py-2 mb-1">
                    <span style={{ marginRight: 4 }}>Instagram:</span>
                    <a href="https://www.instagram.com/datnull/">
                      https://www.instagram.com/datnull/
                    </a>
                  </div>
                </address>
              </div>
            </div>
            <div class="col-3">
              <h4 class="text-white mb-4">Information</h4>
              <div>
                <div class="footer-links d-flex flex-column">
                  <Link class="text-white py-2 mb-1">Private Policy</Link>
                  <Link class="text-white py-2 mb-1">Shipping Policy</Link>
                  <Link class="text-white py-2 mb-1">Teams of Service</Link>
                  <Link class="text-white py-2 mb-1">Blogs</Link>
                </div>
              </div>
            </div>
            <div class="col-3">
              <h4 class="text-white mb-4">Account</h4>
              <div>
                <div class="footer-links d-flex flex-column">
                  <Link class="text-white py-2 mb-1">About Us</Link>
                  <Link class="text-white py-2 mb-1">Faq</Link>
                  <Link class="text-white py-2 mb-1">Contact</Link>
                  <Link class="text-white py-2 mb-1">Size Chart</Link>
                </div>
              </div>
            </div>
            <div class="col-2">
              <h4 class="text-white mb-4">Quick Links</h4>
              <div class="footer-links d-flex flex-column">
                <Link class="text-white py-2 mb-1">Laptops</Link>
                <Link class="text-white py-2 mb-1">HeadPhones</Link>
                <Link class="text-white py-2 mb-1">Tablets</Link>
                <Link class="text-white py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer class="py-4">
        <div class="container-xxl">
          <div class="row">
            <div class="col-12">
              <p class="text-center mb-0 text-white">
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
