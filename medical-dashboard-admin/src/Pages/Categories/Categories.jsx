import React, { useEffect, useRef, useState } from "react";
import styles from "./Categories.scss";
import { Modal } from "react-bootstrap";
import { Loading, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../redux/actions/serviceActions";
import { useDebounce } from "../../hooks";
import {
  fetchCreateCategory,
  fetchEditCategory,
} from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
const Categories = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [category, setCategory] = useState(null);
  const [name, setName] = useState();
  const [descriptions, setDescriptions] = useState();
  const [status, setStatus] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const handleOpenModalCreate = () => {
    setCategory(null);
    handleShow();
    setName("");
    setDescriptions("");
  };
  const handleCreateCategory = () => {
    dispatch(fetchCreateCategory(name, descriptions, selectedFile));
    setShow(false);
  };
  const handleOpenEditCategory = (id) => {
    const category = categories.find((item) => item?.id == id);
    setName(category?.name);
    setDescriptions(category?.descriptions);
    setStatus(category?.status);
    setCategory(category);
    setShow(true);
  };
  const handleEditCategory = () => {
    console.log(selectedFile);
    dispatch(
      fetchEditCategory(category?.id, name, descriptions, status, selectedFile)
    );
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  let categories = service?.categories;
  const auth = useSelector((state) => state?.auth);

  if (inputValue.trim()) {
    categories = categories.filter((category) => {
      return category?.name.toLowerCase().includes(inputValue.toLowerCase());
    });
  }
  const debouncedSearchValue = useDebounce(inputValue, 720);
  const handleSearchCategory = (e) => {
    setInputValue(e.target.value);
  };
  const handleChooseImage = (e) => {
    setSelectedFile(e.target.files[0]);
    document.getElementById("image").src = URL.createObjectURL(
      e.target.files[0]
    );
  };
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [debouncedSearchValue]);
  return (
    <>
      {service?.loading && <Loading />}
      <Meta title={"Management categories"} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!category && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Tạo mới danh mục
              </label>
            )}
            {category && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Chỉnh sửa danh mục
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
              Tên danh mục
            </label>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              type="text"
              id="ctname"
              placeholder="Enter category name ..."
            />
          </div>
          {category && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Trạng thái danh mục
              </label>

              <select
                defaultValue={status}
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option
                  selected={category?.status == "NOT_ACTIVE"}
                  value="NOT_ACTIVE"
                >
                  Không kích hoạt
                </option>
                <option selected={category?.status == "ACTIVE"} value="ACTIVE">
                  Được kích hoạt
                </option>
              </select>
            </div>
          )}
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctName"
            >
              Mô tả danh mục
            </label>
            <textarea
              onChange={(e) => setDescriptions(e.target.value)}
              value={descriptions}
              row="3"
              className="form-control"
              type="text"
              id="ctname"
              placeholder="Nhập mô tả danh mục ..."
            />
          </div>
          <div className="form-group mb-2 d-flex gap-10 flex-column">
            <input
              onChange={handleChooseImage}
              class="form-control-file"
              type="file"
            />
            <img
              id="image"
              src={`http://127.0.0.1:8887/categories/${category?.categoryImages[0]?.imageUrl}`}
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
            Hủy
          </button>
          {category ? (
            <button className="btn" variant="btn" onClick={handleEditCategory}>
              Chỉnh sửa
            </button>
          ) : (
            <button
              className="btn"
              variant="btn"
              onClick={handleCreateCategory}
            >
              Tạo
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="wrapper-container">
        <div class="row gap-15">
          <div class="col-lg-12">
            <h1 class="page-header">
              <small>Danh sách </small>
              Danh mục
            </h1>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center gap-15">
              <input
                value={inputValue}
                placeholder="Tìm kiếm danh mục theo tên..."
                style={{ width: "24rem" }}
                className="form-control"
                onChange={handleSearchCategory}
              />
              <button onClick={handleOpenModalCreate} className="btn">
                Tạo mới danh mục
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
                <th>Hình ảnh</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody
              style={{
                verticalAlign: "middle",
                overflow: "auto",
              }}
            >
              {categories?.map((item) => (
                <tr key={item?.id} class="odd gradeX" align="center">
                  <td>#{item?.id}</td>
                  <td>
                    <img
                      style={{ width: "236px" }}
                      className="img-fluid"
                      src={`http://127.0.0.1:8887/categories/${item?.categoryImages[0]?.imageUrl}`}
                      alt="img"
                    />
                  </td>
                  <td>
                    <span>
                      <b>{item?.name}</b>{" "}
                    </span>{" "}
                  </td>
                  <td>
                    <span>{item?.descriptions}</span>
                  </td>
                  <td>
                    <span>{item?.status}</span>
                  </td>
                  <td className="center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <Link
                        className="edit-btn"
                        onClick={() => handleOpenEditCategory(item?.id)}
                        to={"#"}
                      >
                        Chỉnh sửa
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categories;
