import React, { useRef, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { FaShippingFast } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { BsCartPlus } from "react-icons/bs";

import styles from "./SingleProduct.scss";
import { Meta, BreadCrum, RatingChanged, ProductCard } from "../../components";

const SingleProduct = () => {
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  console.log("re-render");

  console.log(quantity);

  const handleChangeInput = (event) => {
    setQuantity(Number.parseInt(event.target.value));
  };

  const increasingQuantity = () => {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleReduceQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div>
      <Meta title="Product" />
      <BreadCrum title="Product" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row bg-white">
            <div className="col-6">
              <div className="main-product-image d-flex flex-column gap-15">
                <div className="main-image">
                  <ReactImageZoom
                    zoomStyle={{ width: "100%" }}
                    zoomPosition="original"
                    zoomWidth={592}
                    img={"/images/watch-1.jpg"}
                  />
                </div>
                <div className="other-product-images d-flex gap-10">
                  <div className="col-4 sub-image">
                    <img
                      src="/images/watch-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-4 sub-image">
                    <img
                      src="/images/watch-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-4 sub-image">
                    <img
                      src="/images/watch-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 border-left">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3>
                    Kids Headphone Bulk 10 Pack Multi Colored For Students
                  </h3>
                </div>
                <div className="border-bottom d-flex align-items-center gap-10">
                  <RatingChanged />
                  <span>{"( by reviewers )"}</span>
                </div>
                <div className="border-bottom product-rate">
                  <span>$ 100</span>
                  <div className="d-flex align-items-center gap-15">
                    <FaShippingFast className="color-red" />
                    <div className="d-flex flex-column">
                      <h6>Gì cũng rẻ</h6>
                      <p>
                        Giá tốt nhất so với các sản phẩm cùng loại trên Medical
                        Shop
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-bottom d-flex align-items-center gap-30 product-brand">
                  <h4>Brand:</h4>
                  <h6>Haveils</h6>
                </div>
                <div className="border-bottom d-flex align-item-center gap-30 product-delivery">
                  <h4>Delivery: </h4>
                  <div className="d-flex flex-column gap-10">
                    <div className="d-flex align-items-center gap-10">
                      <FcShipped className="free-ship" />
                      <span>Miễn phí vận chuyển</span>
                    </div>
                    <div className="border-top">
                      <h4>Phí vận chuyển 0đ - 25.000đ</h4>
                    </div>
                  </div>
                </div>
                <div className="border-bottom product-select-quantity d-flex align-items-center gap-30">
                  <h4>Quantity: </h4>
                  <div className="d-flex align-items-center gap-15">
                    <div class="buttons_added">
                      <input
                        onClick={handleReduceQuantity}
                        class="minus is-form"
                        type="button"
                        value="-"
                      />
                      <input
                        onChange={handleChangeInput}
                        aria-label="quantity"
                        class="input-qty"
                        name="quantity"
                        min={1}
                        max={100}
                        type="number"
                        value={quantity}
                      />
                      <input
                        onClick={increasingQuantity}
                        class="plus is-form"
                        type="button"
                        value="+"
                      />
                    </div>
                    <span className="quantity-product">
                      100 sản phẩm có sẵn
                    </span>
                  </div>
                </div>

                <div className="border-bottom d-flex align-items-center gap-15 btn-product ">
                  <button className="button btn-2 add-to-cart d-flex align-items-center gap-10">
                    <BsCartPlus className="icon-add-cart" />
                    <span>Add to cart</span>
                  </button>
                  <button className="button btn-2 buy-now">Mua ngay</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <div className="main-product-description">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                    unde rem dolore rerum quos modi hic ipsum ratione ab
                    obcaecati repellendus asperiores recusandae temporibus
                    deserunt laboriosam exercitationem accusantium, debitis
                    doloribus?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <div className="main-product-more">
                <h4>Các sản phẩm khác</h4>
              </div>
            </div>
            <div className="row align-items-center d-flex">
              <ProductCard grid={3} />
              <ProductCard grid={3} />
              <ProductCard grid={3} />
              <ProductCard grid={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
