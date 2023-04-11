import React from "react";
import RatingChanged from "../RatingChanged/RatingChanged";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SpecialProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/userActions";

const SpecialProduct = (props) => {
  const { product } = props;
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const user = auth?.user;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(user?.id, product?.id, 1));
    } else {
      alert("Bạn cần đăng nhập để sử dụng giỏ hàng !");
    }
  };
  return (
    <div className="col-4 mb-3">
      <Link to={"/product/" + product.id} className="special-product-card">
        <div className="special-product-card-wrapper gap-10">
          <div className="d-flex align-items-center">
            <img
              src={
                "http://127.0.0.1:8887" +
                "/products/" +
                product?.productImages[0]?.imageUrl
              }
              className="img-fluid"
              alt=""
            />
          </div>
          <div>
            <div className="special-product-content">
              <h5 className="brand">{product?.brand?.name}</h5>
              <h6 className="title">{product?.title}</h6>
              <RatingChanged />
              <p className="price">
                <span className="red-p">
                  {product?.originalPrice.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>{" "}
                &nbsp;
                <strike>
                  {product?.originalPrice.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strike>
              </p>
              <div className="discount-till d-flex align-items-center">
                <p className="mb-0">
                  <b>5 days</b>
                </p>
              </div>
              <div className="product-count">
                <p>Products: {product?.currentAmount}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${
                        (product?.currentAmount / product?.currentAmount) * 100
                      }%`,
                    }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link onClick={handleAddToCart} className="button">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpecialProduct;
