import React, { useCallback, useRef, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { FaShippingFast } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Lightbox } from "react-modal-image";

import { FcShipped } from "react-icons/fc";
import { BsCartPlus } from "react-icons/bs";
import "react-multi-carousel/lib/styles.css";

import styles from "./SingleProduct.scss";
import {
  Meta,
  BreadCrum,
  RatingChanged,
  ProductCard,
  Loading,
  ToastAlert,
} from "../../components";
import {
  fetchOneProduct,
  loadAction,
} from "../../redux/actions/serviceActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  setCheckout,
  setTotalPriceToCheckoutAction,
} from "../../redux/actions/userActions";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [openImage, setOpenImage] = useState(false);

  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const product = service?.product;
  const auth = useSelector((state) => state?.auth);
  const productInCategory = service?.products;
  const navigate = useNavigate();
  const user = auth?.user;
  const { id } = useParams("id");
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
  const handleZoomImage = (event) => {
    setOpenImage(event.target.children[0].currentSrc);
  };
  const closeLightbox = () => {
    setOpenImage(false);
  };
  const handleBuyNow = () => {
    if (user) {
      dispatch(setCheckout([{ amount: quantity, product }]));
      dispatch(
        setTotalPriceToCheckoutAction(quantity * product?.originalPrice)
      );
      dispatch(loadAction(true));
      setTimeout(() => {
        dispatch(loadAction(false));
        navigate("/checkout?actor=product");
      }, 1000);
    } else {
      navigate("/auth/login");
    }
  };
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(user?.id, product?.id, quantity));
    } else {
      navigate("/auth/login");
    }
  };
  // if (auth?.success) {
  //   alert("Thêm vào giỏ hàng thành công !");
  // }
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOneProduct(id));
  }, []);
  return (
    <div>
      {auth?.loading && <Loading />}
      <Meta title="Product" />
      <BreadCrum title="Product" />
      {auth?.success && <ToastAlert>Thêm vào giỏ hàng thành công !</ToastAlert>}
      {openImage && (
        <Lightbox
          medium={openImage}
          alt="View product here !"
          onClose={closeLightbox}
        />
      )}
      {product && (
        <div className="main-product-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row bg-white">
              <div className="col-6">
                <div className="main-product-image">
                  <Carousel>
                    <div className="sub-image" onClick={handleZoomImage}>
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
                    <div className="sub-image" onClick={handleZoomImage}>
                      <img
                        src={
                          "http://127.0.0.1:8887" +
                          "/products/" +
                          product?.productImages[1]?.imageUrl
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="sub-image" onClick={handleZoomImage}>
                      <img
                        src={
                          "http://127.0.0.1:8887" +
                          "/products/" +
                          product?.productImages[2]?.imageUrl
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="col-6 border-left">
                <div className="main-product-details">
                  <div className="border-bottom">
                    <h3>{product?.title}</h3>
                  </div>
                  <div className="border-bottom d-flex align-items-center gap-10">
                    <RatingChanged />
                    <span>{"( by reviewers )"}</span>
                  </div>
                  <div className="border-bottom product-rate">
                    <span>
                      {product?.originalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <div className="d-flex align-items-center gap-15">
                      <FaShippingFast className="color-red" />
                      <div className="d-flex flex-column">
                        <h6>Gì cũng rẻ</h6>
                        <p>
                          Giá tốt nhất so với các sản phẩm cùng loại trên
                          Medical Shop
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-bottom d-flex align-items-center gap-30 product-brand">
                    <h4>Brand:</h4>
                    <h6>
                      <a href={product?.brand?.webpage}>
                        {product?.brand?.name}
                      </a>
                    </h6>
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
                      <div className="buttons_added">
                        <input
                          onClick={handleReduceQuantity}
                          className="minus is-form"
                          type="button"
                          value="-"
                        />
                        <input
                          onChange={handleChangeInput}
                          aria-label="quantity"
                          className="input-qty"
                          name="quantity"
                          min={1}
                          max={100}
                          type="number"
                          value={quantity}
                        />
                        <input
                          onClick={increasingQuantity}
                          className="plus is-form"
                          type="button"
                          value="+"
                        />
                      </div>
                      <span className="quantity-product">
                        {product?.amount} sản phẩm có sẵn
                      </span>
                    </div>
                  </div>

                  <div className="border-bottom d-flex align-items-center gap-15 btn-product ">
                    <button
                      onClick={handleAddToCart}
                      className="button btn-2 add-to-cart d-flex align-items-center gap-10"
                    >
                      <BsCartPlus className="icon-add-cart" />
                      <span>Add to cart</span>
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="button btn-2 buy-now"
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 p-0">
                <div className="main-product-description">
                  <h4>Description</h4>
                  <div className="bg-white p-3">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {product?.descriptions.split(".").map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="featured-product home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 p-0">
              <div className="main-product-more">
                <h4>Các sản phẩm khác</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <Carousel
              slidesToSlide={4}
              responsive={responsive}
              showDots={true}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
            >
              {productInCategory.length > 0 &&
                productInCategory.map((element, index) => (
                  <ProductCard key={index} product={element} grid={3} />
                ))}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
