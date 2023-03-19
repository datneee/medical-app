import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrum from "../../components/BreadCrum/BreadCrum";

import styles from "./Blog.scss";
import { Meta, BlogCard } from "../../components";

const Blog = () => {
  return (
    <div>
      <Meta title="Blog" />
      <BreadCrum title="Blog" />
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
              <div className="row">
                <BlogCard grid={6} />
                <BlogCard grid={6} />
                <BlogCard grid={6} />
                <BlogCard grid={6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
