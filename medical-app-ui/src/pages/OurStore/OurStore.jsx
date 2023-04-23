import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Pagination } from "react-headless-pagination";
import "react-bootstrap";

import { useDebounce } from "../../hooks";

import {
  Meta,
  ProductCard,
  RatingChanged,
  BreadCrum,
  Loading,
} from "../../components";
import {
  fetchAllProducts,
  fetchAllCategory,
  fetchAllBrand,
} from "../../redux/actions/serviceActions";

import styles from "./OurStore.scss";
import { useSelector, useDispatch } from "react-redux";

const OurStore = () => {
  let [checkedCategory, setCheckCategory] = useState();
  let [checkedBrand, setCheckedBrand] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState();
  const [grid, setGrid] = useState(3);
  const [page, setPage] = useState(0);
  const [selectFilter, setSelectFilter] = useState("best-selling");
  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  let medicals = service?.products;
  let productHots = medicals.filter((item) => item.isHot == "HOT");
  const brands = service?.brands;
  const categories = service?.categories;
  if (checkedBrand) {
    medicals = medicals?.filter((item) => item?.brand?.id == checkedBrand);
  }
  const useQuery = new URLSearchParams(useLocation().search);
  const searchValue = useQuery.get("search");
  const category = useQuery.get("category");
  const handlePickProductByCategory = (id) => {
    setCheckCategory(id);
  };
  const pagination = service?.pagination;
  const handlePageChange = (pageNumber) => {
    dispatch(
      fetchAllProducts(
        pageNumber + 1,
        (12 / grid) * 2,
        checkedCategory ? JSON.parse(checkedCategory) : category,
        searchValue
      )
    );
    setPage(pageNumber);
  };
  const handleChangeMinPrice = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setMinPrice(searchValue);
    }
  };
  const handleChangeMaxPrice = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setMaxPrice(searchValue);
    }
  };
  const debouncedMinValue = useDebounce(minPrice, 650);
  const debouncedMaxValue = useDebounce(maxPrice, 650);
  const handleChangeSelectFilter = (e) => {
    setSelectFilter(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      fetchAllProducts(
        page + 1,
        (12 / grid) * 2,
        checkedCategory ? JSON.parse(checkedCategory) : category,
        searchValue,
        debouncedMinValue,
        debouncedMaxValue
      )
    );

    switch (selectFilter) {
      case "best-selling":
        break;
      case "title-ascending":
        break;
      case "title-descending":
        break;
      case "price-descending":
        break;
      case "price-ascending":
        break;
      default:
        break;
    }
  }, [
    grid,
    checkedCategory,
    checkedBrand,
    debouncedMinValue,
    debouncedMaxValue,
    selectFilter,
  ]);
  useEffect(() => {
    setCheckCategory(category);
    window.scrollTo(0, 0);
    dispatch(fetchAllCategory());
    dispatch(fetchAllBrand());
    dispatch(
      fetchAllProducts(
        page + 1,
        (12 / grid) * 2,
        checkedCategory ? JSON.parse(checkedCategory) : category,
        searchValue,
        debouncedMinValue,
        debouncedMaxValue
      )
    );
  }, [grid, category]);
  return (
    <div>
      {service?.loading && <Loading />}
      <Meta title={"Our Store"} />
      <BreadCrum title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Các sản phẩm hot</h3>
                <Carousel className="product-hot-list">
                  {productHots?.map((item) => (
                    <Carousel.Item key={item?.id} interval={2000}>
                      <Link
                        to={"/product/" + item?.id}
                        className="text-dark product-hot d-flex align-items-center mb-3 gap-10"
                      >
                        <div className="w-50">
                          <img
                            src={
                              "http://127.0.0.1:8887" +
                              "/products/" +
                              item?.productImages[0]?.imageUrl
                            }
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="w-50">
                          <h5>{item?.title}</h5>
                          <RatingChanged />
                          <p>
                            {item?.originalPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                      </Link>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Lọc theo danh mục</h3>
                <div>
                  <div className="ps-0">
                    {categories &&
                      categories?.map((category) => (
                        <div className="form-check" key={category.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={
                              checkedCategory &&
                              JSON.parse(checkedCategory) === category.id
                            }
                            onChange={() =>
                              handlePickProductByCategory(category.id)
                            }
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
                <h3 className="filter-title">Lọc theo nhãn hàng</h3>
                <div>
                  <div className="ps-0">
                    {brands.length > 0 &&
                      brands?.map((brand) => (
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
                <h3 className="filter-title">Lọc theo</h3>
                <div style={{ padding: 6 }}>
                  <h5 className="sub-title">Giá</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        value={minPrice}
                        onChange={handleChangeMinPrice}
                        type="number"
                        defaultValue={0}
                        className="form-control"
                        id="inputFrom"
                        placeholder="from"
                      />
                      <label htmlFor="inputFrom">$ Từ</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        value={maxPrice}
                        onChange={handleChangeMaxPrice}
                        type="number"
                        className="form-control"
                        id="inputTo"
                        placeholder="to"
                      />
                      <label htmlFor="inputTo">$ Đến</label>
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
                      <p className="mb-0 d-block">Sắp xếp theo: </p>
                      <select
                        onChange={handleChangeSelectFilter}
                        value={selectFilter}
                        name=""
                        id=""
                        className="form-control form-select"
                      >
                        <option value="best-selling">
                          Mặt hàng được quan tâm nhất
                        </option>
                        <option value="title-ascending">
                          Theo tên, từ A-Z
                        </option>
                        <option value="price-descending">
                          Theo giá, từ thấp - cao
                        </option>
                        <option value="price-ascending">
                          Theo giá, từ cao - thấp
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts">{pagination.total} sản phẩm</p>
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
                <div className="products-list row align-items-center d-flex">
                  {medicals &&
                    medicals?.map((product, index) => (
                      <ProductCard key={index} product={product} grid={grid} />
                    ))}
                </div>
              )}
              {grid == 4 && (
                <div className="products-list row align-items-center d-flex">
                  {medicals &&
                    medicals?.map((product, index) => (
                      <ProductCard key={index} product={product} grid={grid} />
                    ))}
                </div>
              )}
              {grid == 6 && (
                <div className="products-list row align-items-center d-flex">
                  {medicals &&
                    medicals?.map((product, index) => (
                      <ProductCard key={index} product={product} grid={grid} />
                    ))}
                </div>
              )}
              {grid == 12 && (
                <div className="products-list row align-items-center d-flex">
                  {medicals &&
                    medicals?.map((product, index) => (
                      <ProductCard key={index} product={product} grid={grid} />
                    ))}
                </div>
              )}
              <div className="pagination-wrapper">
                <div className="current-page">Trang hiện tại: {page + 1}</div>
                <Pagination
                  currentPage={page}
                  setCurrentPage={handlePageChange}
                  totalPages={pagination.lastPage}
                  edgePageCount={2}
                  middlePagesSiblingCount={2}
                  className="pagination"
                  truncableText="..."
                  truncableClassName=""
                >
                  <Pagination.PrevButton className="">
                    Quay lại trang trước
                  </Pagination.PrevButton>

                  <div className="d-flex align-items-center justify-content-center flex-grow gap-15">
                    <Pagination.PageButton
                      activeClassName=""
                      inactiveClassName=""
                      className=""
                    />
                  </div>

                  <Pagination.NextButton className="">
                    Trang tiếp theo
                  </Pagination.NextButton>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
