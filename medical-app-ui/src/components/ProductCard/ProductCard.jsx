import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import RatingChanged from "../RatingChanged/RatingChanged";
import styles from "./ProductCard.scss";

const ProductCard = () => {
  return (
    <Link className="col-3" style={{ color: "black" }}>
      <div className="product-card position-relative">
        <div className="wishlist-icons position-absolute">
          <Link>
            <AiOutlineHeart size={32} />
          </Link>
        </div>
        <div className="product-image">
          <img src="images/watch.jpg" alt="" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphone bulk 10 pack multi colored for students
          </h5>
          <RatingChanged />
          <p className="price">$100.00</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <Link>
              <BsCartPlus size={32} />
            </Link>
            <Link>
              <img src="images/view.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
