import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import RatingChanged from "../RatingChanged/RatingChanged";
import styles from "./ProductCard.scss";

const ProductCard = (props) => {
  const { grid, wishlist, product } = props;
  return (
    <div
      key={product.id}
      className={`col-${grid} mb-3  d-flex align-items-center justify-content-center`}
    >
      <Link
        to={"/product/" + product?.id}
        className="product-card position-relative text-dark w-100 "
      >
        <div className="product-image">
          <div className="wishlist-icons position-absolute">
            {!wishlist ? (
              <Link className="tym-item">
                <AiOutlineHeart size={32} />
              </Link>
            ) : (
              <Link className="cancel-item">
                <img src="/images/cross.svg" alt="" className="img-fluid" />
              </Link>
            )}
          </div>
          <img
            src={
              "http://127.0.0.1:8887" +
              "/" +
              product?.productImages[0]?.imageUrl
            }
            alt=""
          />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">{product?.title}</h5>
          <RatingChanged />
          <p className="description">{product?.descriptions}</p>
          <p className="price">
            {product?.originalPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <Link className="addCart-item-icon">
              <BsCartPlus size={32} />
            </Link>
            <Link className="seeItem-icon">
              <img width={32} src="/images/view.svg" alt="" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
