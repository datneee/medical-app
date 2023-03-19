import React from "react";
import { Link } from "react-router-dom";
import { Meta, BreadCrum } from "../../components";

import { HiOutlineArrowLeft } from "react-icons/hi";

import styles from "./SingleBlog.scss";

const SingleBlog = () => {
  return (
    <div>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrum title="Dynamic Blog Name" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-nav mb-3">
                <h3 className="filter-title">Navigation</h3>
                <div style={{ padding: "0 8px" }}>
                  <div className="ps-0">
                    <ul className="ps-0">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/store">Our store</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="single-blog-card">
                <Link to="/blog" className="d-flex gap-10 align-items-center">
                  <HiOutlineArrowLeft />
                  Go back to Blogs
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  src="/images/blog-1.jpg"
                  alt="blog"
                  className="img-fluid w-100 my-4"
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores dolorem, earum nobis natus ipsum expedita eaque
                  voluptas magni harum maxime quis odio neque facilis doloribus
                  quia corporis voluptatibus, quas aliquam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
