import React from "react";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import RatingChanged from "../RatingChanged/RatingChanged";
import styles from "./ProductCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/userActions";

const ProductCard = (props) => {
  const { grid, wishlist, product } = props;
  const auth = useSelector((state) => state?.auth);

  const user = auth?.user;
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (user) {
      await dispatch(addToCart(user?.id, product?.id, 1));
    } else {
      alert("Bạn cần đăng nhập để sử dụng giỏ hàng !");
    }
  };
  return (
    <div
      style={{ width: "100%!important" }}
      key={product.id}
      className={`mb-3 product-card-wrapper col-${grid} d-flex align-items-center justify-content-center`}
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
          <div className="product-image-content">
            <img
              src={
                "http://127.0.0.1:8887" +
                "/products/" +
                product?.productImages[0]?.imageUrl
              }
              alt=""
            />
            <img
              src={
                "http://127.0.0.1:8887" +
                "/products/" +
                product?.productImages[1]?.imageUrl
              }
              alt=""
            />
          </div>
        </div>
        <div className="product-details">
          <h6 className="brand">{product?.brand?.name}</h6>
          <h5 className="product-title">{product?.title}</h5>
          <RatingChanged />
          <p className="description">{product?.descriptions}</p>
          <p className="price">
            <span className="red-p">
              {product?.promotionPrice?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-10">
            <Link onClick={handleAddToCart} className="addCart-item-icon">
              <BsCartPlus size={32} />
            </Link>
            <Link to={"/product/" + product?.id} className="seeItem-icon">
              <img width={32} src="/images/view.svg" alt="" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
