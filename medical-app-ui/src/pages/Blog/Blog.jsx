import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrum from "../../components/BreadCrum/BreadCrum";

import styles from "./Blog.scss";
import { Meta, BlogCard } from "../../components";
const blogs = [
  {
    id: 1,
    title: "(Covid) Theo dõi và dùng khẩu trang khi ra ngoài",
    date: new Date(),
    header: "",
    body: "",
    foooter: ""
  },
  {
    id: 2,
    title: "Khám sức khỏe thường xuyên",
    date: new Date(),
    header: "",
    body: "",
    foooter: ""
  },
  {
    id: 3,
    title: "Xây dựng chế độ ăn uống lành mạnh",
    date: new Date(),
    header: "",
    body: "",
    foooter: ""
  },
  {
    id: 4,
    title: "Thường xuyên tập thể dục, vận động cơ thể",
    date: new Date(),
    header: "",
    body: "",
    foooter: ""
  }

]
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
                {blogs?.map((item) => <BlogCard key={item?.id} blog={item} grid={6} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
