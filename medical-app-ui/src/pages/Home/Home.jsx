import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "./Home.scss";
import { ProductCard, Meta, BreadCrum, Loading } from "../../components";
import {
  fetchAllProducts,
  fetchAllCategory,
  fetchAllBrand,
  fetchListProductFeatured
} from "../../redux/actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";
import ListSpecialProducts from "../../components/ListSpecialProducts/ListSpecialProducts";
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
const Home = () => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const medicals = service?.products;
  const categories = service?.categories;
  const brands = service?.brands;
  const featureds = service?.productFeatured;
  const mainCategory = categories[0];
  const listSubCategories = categories.slice(1, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllProducts());
    dispatch(fetchListProductFeatured())
    dispatch(fetchAllCategory());
    dispatch(fetchAllBrand());
  }, []);

  return (
    <div>
      {service?.loading && <Loading />}
      <Meta title={"Medical home"} />
      <BreadCrum title="Medical home" />
      <section className="home-wrapper-1">
        <div className="container-xxl">
          <div className="row p-3" style={{ height: 420 }}>
            <Link
              to={`/store?category=${mainCategory?.id}`}
              className="col-6"
              style={{ height: "100%" }}
            >
              <div
                className="main-banner position-relative"
                style={{ height: "100%" }}
              >
                <img
                  className="img-fluid rounded-3"
                  src={`http://127.0.0.1:8887/categories/${mainCategory?.categoryImages[0]?.imageUrl}`}
                  alt=""
                />
                <div className="main-banner-content position-absolute">
                  <h4>{mainCategory?.name}</h4>

                  <Link className="button">VIEW NOW</Link>
                </div>
              </div>
            </Link>
            <div className="col-6" style={{ height: "100%" }}>
              <div
                style={{ height: "100%" }}
                className="d-flex flex-wrap justify-content-between align-items-center gap-10"
              >
                {listSubCategories?.map((item) => (
                  <Link
                    key={item?.id}
                    to={`/store?category=${item?.id}`}
                    className="small-banner position-relative"
                    style={{ height: "49%" }}
                  >
                    <img
                      className="img-fluid rounded-3"
                      src={`http://127.0.0.1:8887/categories/${item?.categoryImages[0]?.imageUrl}`}
                      alt=""
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>{item?.name}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-3">
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
      <section className="marque-wrapper py-3">
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
      <section className="featured-product home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Products</h3>
            </div>
          </div>
          <div className="row">
            <Carousel
              responsive={responsive}
              //showDots={true}
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
              {featureds.length > 0 &&
                featureds.map((element, index) => (
                  <ProductCard key={index} product={element} grid={3} />
                ))}
            </Carousel>
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-3 home-wrapper-2">
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
      {medicals && <ListSpecialProducts products={medicals} />}
      <section className="brand-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner bg-white p-3">
                <Marquee className="d-flex">
                  {brands.length > 0 &&
                    brands?.map((item) => (
                      <div key={item?.id} className="mx-4 w-25">
                        <img
                          src={item?.logo}
                          style={{ width: "120px" }}
                          alt="brand"
                        />
                      </div>
                    ))}
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
