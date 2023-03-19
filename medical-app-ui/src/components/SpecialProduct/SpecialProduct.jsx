import React from "react";
import RatingChanged from "../RatingChanged/RatingChanged";
import { Link } from "react-router-dom";

import styles from "./SpecialProduct.scss";

const SpecialProduct = () => {
  return (
    <div className="col-4 mb-3">
      <div className="special-product-card">
        <div className="special-product-card-wrapper">
          <div className="d-flex align-items-center">
            <img src="images/watch.jpg" className="img-fluid" alt="" />
          </div>
          <div>
            <div className="special-product-content">
              <h5 className="brand">Havels</h5>
              <h6 className="title">
                Samsung Galaxy Note10+ Mobie Phone, like a special product
                productproduct Samsung Galaxy Note10+ Mobie Phone
              </h6>
              <RatingChanged />
              <p className="price">
                <span className="red-p">$100</span> &nbsp;
                <strike>$200</strike>
              </p>
              <div className="discount-till d-flex align-items-center">
                <p className="mb-0">
                  <b>5 days</b>
                </p>
              </div>
              <div className="product-count">
                <p>Products: 5</p>
                <div class="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button">Add to cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
