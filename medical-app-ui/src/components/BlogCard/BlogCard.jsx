import React from "react";
import { Link } from "react-router-dom";

import styles from "./BlogCard.scss";

const BlogCard = (props) => {
  const { grid } = props;
  return (
    <div className={`col-${grid} mb-3`}>
      <div className="blog-card">
        <Link to="#" className="card-image">
          <img src="images/blog-1.jpg" alt="" className="img-fluid" />
        </Link>
        <div className="blog-content">
          <p className="date">1 Dec, 2022</p>
          <h5 className="title">A beatifull sunday morning renaissance</h5>
          <p className="description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            esse, adipisci nesciunt pariatur rerum eos doloribus aut, dolore
            sunt distinctio suscipit quisquam, officiis quae facilis deleniti
            maxime. Quis, quo ut.
          </p>
          <Link to="/blog/:id" className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
