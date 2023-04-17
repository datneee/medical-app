import React, { useEffect, useState } from "react";
import styles from "./Products.scss";
import { Loading, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  fetchAllBrand,
  fetchAllCategory,
  fetchAllProducts,
  fetchOneProduct,
} from "../../redux/actions/serviceActions";
import { useDebounce } from "../../hooks";
import { Link } from "react-router-dom";
import { Pagination } from "react-headless-pagination";
import ProductServices from "../../utils/httpsRequests/ProducServices";
import { async } from "q";
import {
  fetchCreateProduct,
  fetchDeleteProduct,
  fetchEditProduct,
} from "../../redux/actions/userActions";

const Products = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");

  const [originalPrice, setOriginalPrice] = useState(0);
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [status, setStatus] = useState();
  const [isHot, setIsHot] = useState();

  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const brands = service?.brands;
  const categories = service?.categories;
  let products = service?.products;
  const pagination = service?.pagination;
  const handlePageChange = (pageNumber) => {
    dispatch(fetchAllProducts(pageNumber + 1, 5, null, searchValue));
    setPage(pageNumber);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleChooseImage = (e) => {
    setSelectedFile(e.target.files);
    if (e.target.files[0]) {
      document.getElementById("image-1").src = URL.createObjectURL(
        e.target.files[0]
      );
    }
    if (e.target.files[1]) {
      document.getElementById("image-2").src = URL.createObjectURL(
        e.target.files[1]
      );
    }
    if (e.target.files[2]) {
      document.getElementById("image-3").src = URL.createObjectURL(
        e.target.files[2]
      );
    }
  };
  const debouncedSearchValue = useDebounce(searchValue, 720);
  const handleOpenModalCreate = () => {
    setProduct(null);
    resetForm();
    handleShow();
  };
  const resetForm = () => {
    setTitle("");
    setDescriptions("");
    setOriginalPrice(0);
    setPromotionPrice(0);
    setAmount(0);
    setCurrentAmount(0);
    setBrand(1);
    setCategory(1);
    setStatus();
    setIsHot();
    setProduct();
  };
  const setForm = (product) => {
    setTitle(product?.title);
    setDescriptions(product?.descriptions);
    setOriginalPrice(product?.originalPrice);
    setPromotionPrice(product?.promotionPrice);
    setAmount(product?.amount);
    setCurrentAmount(product?.currentAmount);
    setBrand(product?.brand?.id);
    setCategory(product?.category?.id);
    setStatus(product?.status);
    setIsHot(product?.isHot);
  };
  const handleOpenEditProduct = async (id) => {
    const productSelected = await ProductServices.getProductById(id);
    setForm(productSelected);
    console.log(productSelected);
    setProduct(productSelected);
    setShow(true);
  };

  const handleCreateProduct = () => {
    const form = {
      title,
      descriptions,
      originalPrice: JSON.parse(originalPrice),
      promotionPrice: JSON.parse(promotionPrice),
      amount: JSON.parse(amount),
      currentAmount: currentAmount
        ? JSON.parse(currentAmount)
        : JSON.parse(amount),
      categoryId: JSON.parse(category),
      brandId: JSON.parse(brand),
      isHot: isHot ? isHot : "NORMAL",
    };
    dispatch(fetchCreateProduct(form, selectedFile));
    setShow(false);
  };
  const handleEditProduct = (id) => {
    const form = {
      title,
      descriptions,
      originalPrice: JSON.parse(originalPrice),
      promotionPrice: JSON.parse(promotionPrice),
      amount: JSON.parse(amount),
      currentAmount: currentAmount
        ? JSON.parse(currentAmount)
        : JSON.parse(amount),
      status: status ? status : product?.status,
      isHot: isHot ? isHot : product?.isHot,
    };
    dispatch(fetchEditProduct(id, form, selectedFile));
    setShow(false);
  };
  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn xóa sản phẩm này ? ")) {
      dispatch(fetchDeleteProduct(id));
      setPage(1);
    }
  };
  useEffect(() => {
    dispatch(fetchAllProducts(1, 5, null, searchValue));
    dispatch(fetchAllBrand());
    dispatch(fetchAllCategory());
  }, [debouncedSearchValue]);
  return (
    <div>
      {service?.loading && <Loading />}
      <Meta title={"Management products"} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!product && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Create Product
              </label>
            )}
            {product && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Edit Product
              </label>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctName"
            >
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              type="text"
              id="ctname"
              placeholder="Enter category name ..."
            />
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctDes"
            >
              Product descriptions
            </label>
            <textarea
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
              row="3"
              className="form-control"
              type="text"
              id="ctDes"
              placeholder="Enter category name ..."
            />
          </div>
          <div className="d-flex align-items-center gap-10 mb-2">
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctOrPrice"
              >
                Original Prices
              </label>
              <input
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter original Price ..."
                id="ctOrPrice"
              />
            </div>
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctProPrice"
              >
                Promotion Prices
              </label>
              <input
                value={promotionPrice}
                onChange={(e) => setPromotionPrice(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter promotion Price ..."
                id="ctProPrice"
              />
            </div>
          </div>
          <div className="d-flex align-items-center gap-10 mb-2">
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctAmount"
              >
                Amounts
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter amount ..."
                id="ctAmount"
              />
            </div>
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctCurAmount"
              >
                Current Amounts
              </label>
              <input
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Enter current amount..."
                id="ctCurAmount"
              />
            </div>
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctCatg"
            >
              Category
            </label>
            <select
              disabled={product != null}
              defaultValue={category}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              name="category"
              id="ctCatg"
            >
              {categories?.map((item) => (
                <option value={item?.id}>{item?.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctBrand"
            >
              Brand
            </label>
            <select
              disabled={product != null}
              defaultValue={brand}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-control"
              name="brand"
              id="ctBrand"
            >
              {brands?.map((item) => (
                <option value={item?.id}>{item?.name}</option>
              ))}
            </select>
          </div>
          {product && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctStatus"
              >
                Product Status
              </label>

              <select
                defaultValue={status ? status : "OPENING"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="ctStatus"
                className="form-control"
              >
                <option value="OPENING">OPENING</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          )}
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctHot"
            >
              Product Hot
            </label>

            <select
              value={isHot}
              defaultValue={isHot ? isHot : "NORMAL"}
              onChange={(e) => setIsHot(e.target.value)}
              id="ctHot"
              className="form-control"
            >
              <option value="HOT">HOT</option>
              <option value="NORMAL">NORMAL</option>
            </select>
          </div>
          <div className="form-group mb-2 d-flex gap-10 flex-column">
            <input
              onChange={handleChooseImage}
              class="form-control-file"
              type="file"
              multiple
            />
            <div className="d-flex gap-10">
              <img
                id="image-1"
                style={{ width: "30%", objectFit: "contain" }}
                src={`http://127.0.0.1:8887/products/${product?.productImages[0]?.imageUrl}`}
                alt="img"
                className="img-fluid img-thumbnail"
              />
              <img
                id="image-2"
                style={{ width: "30%", objectFit: "contain" }}
                src={`http://127.0.0.1:8887/products/${product?.productImages[1]?.imageUrl}`}
                alt="img"
                className="img-fluid img-thumbnail"
              />
              <img
                id="image-3"
                style={{ width: "30%", objectFit: "contain" }}
                src={`http://127.0.0.1:8887/products/${product?.productImages[2]?.imageUrl}`}
                alt="img"
                className="img-fluid img-thumbnail"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-normal"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </button>
          {product ? (
            <button
              onClick={() => handleEditProduct(product?.id)}
              className="btn"
              variant="btn"
            >
              Edit
            </button>
          ) : (
            <button onClick={handleCreateProduct} className="btn" variant="btn">
              Create
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="container-xxl mt-5">
        <div class="row gap-15">
          <div class="col-lg-12">
            <h1 class="page-header">
              <span>
                <small>Danh sách</small>
              </span>{" "}
              sản phẩm
            </h1>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center gap-15">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm danh mục theo tên..."
                style={{ width: "24rem" }}
                className="form-control"
              />
              <button onClick={handleOpenModalCreate} className="btn">
                Create new category
              </button>
            </div>
          </div>
          <table
            class="table table-striped table-bordered table-hover"
            id="dataTables-example"
          >
            <thead>
              <tr align="center">
                <th>ID</th>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody
              style={{
                verticalAlign: "middle",
                overflow: "auto",
              }}
            >
              {products?.map((item) => (
                <tr key={item?.id} class="odd gradeX" align="center">
                  <td>#{item?.id}</td>
                  <td>
                    <span>
                      <b>{item?.title}</b>{" "}
                    </span>{" "}
                  </td>
                  <td>
                    <img
                      style={{ width: "236px" }}
                      className="img-fluid"
                      src={`http://127.0.0.1:8887/products/${item?.productImages[0]?.imageUrl}`}
                      alt="img"
                    />
                  </td>
                  <td>
                    <span>{item?.descriptions}</span>
                  </td>
                  <td>
                    <span>
                      <b>{item?.originalPrice}</b>
                    </span>
                  </td>
                  <td>
                    <span>{item?.status}</span>
                  </td>
                  <td className="center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <Link
                        onClick={() => handleDeleteProduct(item?.id)}
                        className="delete-btn"
                        to={"#"}
                      >
                        Delete
                      </Link>
                      <Link
                        onClick={() => handleOpenEditProduct(item?.id)}
                        className="edit-btn"
                        to={"#"}
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-wrapper">
            <div className="current-page">Current page: {page + 1}</div>
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
                Previous
              </Pagination.PrevButton>

              <div className="d-flex align-items-center justify-content-center flex-grow gap-15">
                <Pagination.PageButton
                  activeClassName=""
                  inactiveClassName=""
                  className=""
                />
              </div>

              <Pagination.NextButton className="">Next</Pagination.NextButton>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
