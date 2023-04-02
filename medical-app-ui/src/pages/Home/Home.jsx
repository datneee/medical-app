import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Carousel } from "@trendyol-js/react-carousel";

import styles from "./Home.scss";
import { ProductCard, Meta, BreadCrum } from "../../components";
import SpecialProduct from "../../components/SpecialProduct/SpecialProduct";
import { fetchAllProducts } from "../../redux/actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const medicals = useSelector((state) => state?.service?.products);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div>
      <Meta title={"Medical home"} />
      <BreadCrum title="Medical home" />
      <section className="home-wrapper-1">
        <div className="container-xxl">
          <div className="row p-3">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/main-banner.jpg"
                  alt=""
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUBPERCHARGED FOR PROS</h4>
                  <h5>Ipad S14+ pro</h5>
                  <p>From $99.00 or more $41.62/Pro</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-10">
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-01.jpg"
                    alt=""
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUBPERCHARGED FOR PROS</h4>
                    <h5>Ipad S14+ pro</h5>
                    <p>From $99.00 or more $41.62/Pro</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-02.jpg"
                    alt=""
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUBPERCHARGED FOR PROS</h4>
                    <h5>Ipad S14+ pro</h5>
                    <p>From $99.00 or more $41.62/Pro</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-03.jpg"
                    alt=""
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUBPERCHARGED FOR PROS</h4>
                    <h5>Ipad S14+ pro</h5>
                    <p>From $99.00 or more $41.62/Pro</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-04.jpg"
                    alt=""
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUBPERCHARGED FOR PROS</h4>
                    <h5>Ipad S14+ pro</h5>
                    <p>From $99.00 or more $41.62/Pro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service.png" alt="" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all order over $100</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-02.png" alt="" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-03.png" alt="" />
                  <div>
                    <h6>Support 24/6</h6>
                    <p className="mb-0">Shop with expert</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-04.png" alt="" />
                  <div>
                    <h6>Affordable Price</h6>
                    <p className="mb-0">Get Factory direct price</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-05.png" alt="" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  I can be a React component, multiple React components, or just
                  some text.
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-product home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Products</h3>
            </div>
          </div>
          <div className="row">
            {medicals.length > 0 &&
              medicals.map((element, index) => (
                <ProductCard key={index} product={element} grid={3} />
              ))}
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Take Cared The Most</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="famous-card bg-dark ">
                <div className="famous-content color-white ">
                  <h5>Big Screen</h5>
                  <h6>Smarrt Watch Series 7</h6>
                  <p>From $399 or $16.62 / mo . forr 24 mo</p>
                </div>
                <div className="famous-image">
                  <img src="images/famous-1.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="famous-card  ">
                <div className="famous-content color-dark">
                  <h5>Big Screen</h5>
                  <h6>Smarrt Watch Series 7</h6>
                  <p>From $399 or $16.62 / mo . forr 24 mo</p>
                </div>
                <div className="famous-image">
                  <img src="images/famous-2.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="famous-card  ">
                <div className="famous-content color-dark">
                  <h5>Big Screen</h5>
                  <h6>Smarrt Watch Series 7</h6>
                  <p>From $399 or $16.62 / mo . forr 24 mo</p>
                </div>
                <div className="famous-image">
                  <img src="images/famous-2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-product py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            {medicals.map((product, index) => (
              <SpecialProduct key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="brand-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner bg-white p-3">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-8.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
