import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./BlogCard.scss";

const BlogCard = (props) => {
  const { grid, blog, blogId } = props;
  console.log(blog);
  return (
    <div className={`col-${grid} mb-3`}>
      <div className="blog-card">
        <Link to="#" className="card-image">
          <img src={"/images/" + blog?.image} alt="" className="img-fluid" />
        </Link>
        <div className="blog-content">
          <p className="date">{blog?.date}</p>
          <h5 className="title mt-3 mb-3">{blog?.title}</h5>
          <Link to={"/blog/" + blogId} className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
