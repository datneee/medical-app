import React, { useEffect, useState } from "react";
import styles from "./Products.scss";
import { Loading, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  fetchAllBrand,
  fetchAllProducts,
} from "../../redux/actions/serviceActions";
import { useDebounce } from "../../hooks";
import { Link } from "react-router-dom";
import { Pagination } from "react-headless-pagination";

const Products = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const brands = service?.brands;
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
    setSelectedFile(e.target.files[0]);
    document.getElementById("image").src = URL.createObjectURL(
      e.target.files[0]
    );
  };
  const debouncedSearchValue = useDebounce(searchValue, 720);
  const handleOpenModalCreate = () => {
    setProduct(null);
    handleShow();
  };
  useEffect(() => {
    dispatch(fetchAllProducts(1, 5, null, searchValue));
    dispatch(fetchAllBrand());
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
              Category descriptions
            </label>
            <textarea
              row="3"
              className="form-control"
              type="text"
              id="ctDes"
              placeholder="Enter category name ..."
            />
          </div>
          {product && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctStatus"
              >
                Category Status
              </label>

              <select id="ctStatus" className="form-control">
                <option value="NOT_ACTIVE">NOT ACTIVE</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
            </div>
          )}

          <div className="form-group mb-2 d-flex gap-10 flex-column">
            <input
              onChange={handleChooseImage}
              class="form-control-file"
              type="file"
            />
            <img
              id="image"
              src={`http://127.0.0.1:8887/products/${product?.productImages[0]?.imageUrl}`}
              alt="img"
              className="img-fluid"
            />
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
            <button className="btn" variant="btn">
              Edit
            </button>
          ) : (
            <button className="btn" variant="btn">
              Create
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="container-xxl mt-5">
        <div class="row gap-15">
          <div class="col-lg-12">
            <h1 class="page-header">
              <small>Danh sách</small>
              Danh mục
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
                      <Link className="delete-btn" to={"#"}>
                        Delete
                      </Link>
                      <Link className="edit-btn" to={"#"}>
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
