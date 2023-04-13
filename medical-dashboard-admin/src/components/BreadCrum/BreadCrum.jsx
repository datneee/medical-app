import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadCrum.scss";

const BreadCrum = (props) => {
  const { title } = props;

  return (
    <div className="breadCrum py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="tex-center">
              <Link to="/" className="text-dark">
                Home
              </Link>{" "}
              / {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrum;
