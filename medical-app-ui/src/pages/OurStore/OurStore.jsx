import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Meta, ProductCard, RatingChanged, BreadCrum } from "../../components";
import { fetchAllProducts } from "../../redux/actions/serviceActions";

import styles from "./OurStore.scss";
import { useSelector, useDispatch } from "react-redux";

const categories = [
  {
    id: 1,
    name: "Watch",
  },
  {
    id: 2,
    name: "TV",
  },
];
const brands = [
  {
    id: 1,
    name: "Apple",
  },
  {
    id: 2,
    name: "Samsung",
  },
];

const OurStore = () => {
  let [checkedCategory, setCheckCategory] = useState();
  let [checkedBrand, setCheckedBrand] = useState();

  const [grid, setGrid] = useState(3);
  const dispatch = useDispatch();

  const medicals = useSelector((state) => state?.service?.products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <div>
      <Meta title={"Our Store"} />
      <BreadCrum title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Hot</h3>
                <Carousel className="product-hot-list">
                  <Carousel.Item interval={2000}>
                    <Link
                      to="/product/1"
                      className="text-dark product-hot d-flex align-items-center mb-3"
                    >
                      <div className="w-50">
                        <img
                          src="images/watch.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-50">
                        <h5>
                          Kids headphone bulk 10 pack multi colored for students
                        </h5>
                        <RatingChanged />
                        <p>$1000</p>
                      </div>
                    </Link>
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <Link
                      to={"#"}
                      className="text-dark product-hot d-flex align-items-center mb-3"
                    >
                      <div className="w-50">
                        <img
                          src="images/watch.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-50">
                        <h5>
                          Kids headphone bulk 10 pack multi colored for students
                        </h5>
                        <RatingChanged />
                        <p>$1000</p>
                      </div>
                    </Link>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <div className="ps-0">
                    {categories.map((category) => (
                      <div className="form-check" key={category.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked={checkedCategory == category.id}
                          onChange={() => setCheckCategory(category.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Brand</h3>
                <div>
                  <div className="ps-0">
                    {brands.map((brand) => (
                      <div className="form-check" key={brand.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked={checkedBrand == brand.id}
                          onChange={() => setCheckedBrand(brand.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div style={{ padding: 6 }}>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        defaultValue={0}
                        className="form-control"
                        id="inputFrom"
                        placeholder="from"
                      />
                      <label htmlFor="inputFrom">$ From</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="inputTo"
                        placeholder="to"
                      />
                      <label htmlFor="inputTo">$ To</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-15">
                    <div className="d-flex align-items-center gap-10">
                      <p className="mb-0 d-block">Short By: </p>
                      <select
                        name=""
                        id=""
                        className="form-control form-select"
                      >
                        <option value="best-selling" selected>
                          Best Selling
                        </option>
                        <option value="title-ascending">
                          Alphabetically, A-Z
                        </option>
                        <option value="price-descending">
                          Price, low to hight
                        </option>
                        <option value="price-ascending">
                          Price, hight to low
                        </option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center gap-10">
                      <p className="mb-0 d-block">Category: </p>
                      <select
                        name=""
                        id=""
                        className="form-control form-select"
                      >
                        <option value="best-selling" selected>
                          Category CategoryCategory 1
                        </option>
                        <option value="title-ascending">Category 2</option>
                        <option value="price-descending">Category 3</option>
                        <option value="price-ascending">Category 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts">21 products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => setGrid(3)}
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt=""
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt=""
                      />
                      <img
                        onClick={() => setGrid(6)}
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt=""
                      />
                      <img
                        onClick={() => setGrid(12)}
                        src="images/gr.svg"
                        className="d-block img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              {grid == 3 && (
                <div className="products-list pb-5 row align-items-center d-flex">
                  {medicals.map((product, index) => (
                    <ProductCard key={index} product={product} grid={grid} />
                  ))}
                </div>
              )}
              {grid == 4 && (
                <div className="products-list pb-5 row align-items-center d-flex">
                  {medicals.map((product, index) => (
                    <ProductCard key={index} product={product} grid={grid} />
                  ))}
                </div>
              )}
              {grid == 6 && (
                <div className="products-list pb-5 row align-items-center d-flex">
                  {medicals.map((product, index) => (
                    <ProductCard key={index} product={product} grid={grid} />
                  ))}
                </div>
              )}
              {grid == 12 && (
                <div className="products-list pb-5 row align-items-center d-flex">
                  {medicals.map((product, index) => (
                    <ProductCard key={index} product={product} grid={grid} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
