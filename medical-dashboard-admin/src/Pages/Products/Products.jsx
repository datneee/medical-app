import React, { useEffect, useRef, useState } from "react";
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
  fetchAllTicket,
  fetchCreateProduct,
  fetchCreateShipfee,
  fetchCreateTicket,
  fetchDeleteProduct,
  fetchEditProduct,
} from "../../redux/actions/userActions";

const Products = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState({ active: false, modal: null });
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
  const [ticket, setTicket] = useState();
  const [isHot, setIsHot] = useState();

  const [voucher, setVoucher] = useState("");
  const [fee, setFee] = useState(0);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [endDate, setEndDate] = useState();

  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const auth = useSelector((state) => state?.auth);
  const tickets = auth?.tickets;
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
  const handleShow2 = () => setShow2({ active: true });
  const handleClose2 = () => {
    setShow2({ active: false });
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
    setTicket(product?.ticket?.id);
  };
  const handleOpenEditProduct = async (id) => {
    const productSelected = await ProductServices.getProductById(id);
    setForm(productSelected);
    setProduct(productSelected);
    setShow(true);
  };
  const titleRef = useRef();
  const originalPriceRef = useRef();
  const promotePricePriceRef = useRef();
  const amountPriceRef = useRef();
  let validate = true;
  const handleCreateProduct = () => {
    if (amountPriceRef.current.value == 0 || !amountPriceRef.current.value) {
      amountPriceRef.current.focus();
      amountPriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (
      promotePricePriceRef.current.value == 0 ||
      !promotePricePriceRef.current.value
    ) {
      promotePricePriceRef.current.focus();
      promotePricePriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (
      originalPriceRef.current.value == 0 ||
      !originalPriceRef.current.value
    ) {
      originalPriceRef.current.focus();
      originalPriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (titleRef.current.value == "" || !titleRef.current.value) {
      titleRef.current.focus();
      titleRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (validate) {
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
    }
  };
  const handleEditProduct = (id) => {
    if (amountPriceRef.current.value == 0 || !amountPriceRef.current.value) {
      amountPriceRef.current.focus();
      amountPriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (
      promotePricePriceRef.current.value == 0 ||
      !promotePricePriceRef.current.value
    ) {
      promotePricePriceRef.current.focus();
      promotePricePriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (
      originalPriceRef.current.value == 0 ||
      !originalPriceRef.current.value
    ) {
      originalPriceRef.current.focus();
      originalPriceRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (titleRef.current.value == "" || !titleRef.current.value) {
      titleRef.current.focus();
      titleRef.current.style.border = "1px solid red";
      validate = false;
    }
    if (validate) {
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
        ticketId: ticket ? ticket : "",
      };
      dispatch(fetchEditProduct(id, form, selectedFile));
      setShow(false);
    }
  };
  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn xóa sản phẩm này ? ")) {
      dispatch(fetchDeleteProduct(id));
      setPage(1);
    }
  };
  const handleOpenCreateTicket = () => {
    setShow2({ active: true, modal: "ticket" });
  };
  const handleCreateTicket = () => {
    let date = new Date(endDate).toLocaleDateString("en-US");
    dispatch(fetchCreateTicket(name, discount, date));
    setShow2(false);
  };
  const handleOpenCreateShipFee = () => {
    setShow2({ active: true, modal: "ship" });
  };
  const handleCreateShipFee = () => {
    dispatch(fetchCreateShipfee(voucher, fee));
    setShow2(false);
  };
  useEffect(() => {
    dispatch(fetchAllProducts(1, 5, null, searchValue));
    dispatch(fetchAllBrand());
    dispatch(fetchAllCategory());
    dispatch(fetchAllTicket());
  }, [debouncedSearchValue]);
  return (
    <div>
      {service?.loading && <Loading />}
      <Meta title={"Management products"} />
      <Modal show={show2?.active} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            {show2?.modal == "ticket" && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Tạo mới khuyến mãi
              </label>
            )}
            {show2?.modal == "ship" && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Tạo mới mã giảm giá
              </label>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show2.modal == "ticket" && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctTicket"
              >
                Tên vé khuyến mãi
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                type="text"
                id="ctTicket"
                placeholder="Nhập tên vé khuyến mãi ..."
              />
            </div>
          )}
          {show2.modal == "ticket" && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctDis"
              >
                Giảm giá
              </label>

              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="form-control"
                type="number"
                min={0}
                max={100}
                id="ctDis"
                placeholder="Nhập chiết khấu giảm giá ( từ 0-100% ) ..."
              />
            </div>
          )}
          {show2.modal == "ticket" && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctEndDate"
              >
                Ngày hết hạn
              </label>

              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
                type="date"
                id="ctEndDate"
                placeholder="Nhập ngày hết hạn ..."
              />
            </div>
          )}
          {show2.modal == "ship" && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctVoucher"
              >
                Tên voucher
              </label>

              <input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                className="form-control"
                type="text"
                id="ctVoucher"
                placeholder="Nhập tên voucher ..."
              />
            </div>
          )}
          {show2.modal == "ship" && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctShip"
              >
                Phí vận chuyển ưu đãi
              </label>

              <input
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="form-control"
                type="number"
                id="ctShip"
                placeholder="Nhập phí vận chuyển ưu đãi ..."
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-normal"
            variant="secondary"
            onClick={handleClose2}
          >
            Hủy
          </button>
          {show2.modal == "ship" && (
            <button onClick={handleCreateShipFee} className="btn" variant="btn">
              Tạo
            </button>
          )}
          {show2.modal == "ticket" && (
            <button onClick={handleCreateTicket} className="btn" variant="btn">
              Tạo
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!product && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Tạo mới sản phẩm
              </label>
            )}
            {product && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Chỉnh sửa sản phẩm
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
              Tiêu đề sản phẩm
            </label>

            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              type="text"
              id="ctname"
              placeholder="Nhập tiêu đề sản phẩm ..."
            />
            {/* {<span className="red-warning p-2">Required </span>} */}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctDes"
            >
              Mô tả sản phẩm
            </label>
            <textarea
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
              row="3"
              className="form-control"
              type="text"
              id="ctDes"
              placeholder="Nhập mô tả sản phẩm ..."
            />
          </div>
          <div className="d-flex align-items-center gap-10 mb-2">
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctOrPrice"
              >
                Giá niêm yết sản phẩm
              </label>
              <input
                ref={originalPriceRef}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Nhập giá niêm yết sản phẩm..."
                id="ctOrPrice"
              />
              {/* {<span className="red-warning p-2">Required, Greater than 0 </span>} */}
            </div>
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctProPrice"
              >
                Giá ưu đãi
              </label>
              <input
                ref={promotePricePriceRef}
                value={promotionPrice}
                onChange={(e) => setPromotionPrice(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Nhập giá ưu đãi ..."
                id="ctProPrice"
              />
              {/* {<span className="red-warning p-2">Required, Greater than 0 </span>} */}
            </div>
          </div>
          <div className="d-flex align-items-center gap-10 mb-2">
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctAmount"
              >
                Số lượng kho
              </label>
              <input
                ref={amountPriceRef}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Nhập số lượng ..."
                id="ctAmount"
              />
              {/* {<span className="red-warning p-2">Required, Greater than 0 </span>} */}
            </div>
            <div className="form-group w-50">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctCurAmount"
              >
                Số lượng hiện tại
              </label>
              <input
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Nhập số lượng hiện tại..."
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
              Danh mục
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
              Nhãn hàng
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
            <div className="d-flex align-items-center gap-10 justify-content-between">
              <div className="form-group mb-2 w-50">
                <label
                  className="text-bold p-2"
                  style={{ fontWeight: "500" }}
                  htmlFor="ctStatus"
                >
                  Trạng thái sản phẩm
                </label>

                <select
                  defaultValue={status ? status : "OPENING"}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  id="ctStatus"
                  className="form-control"
                >
                  <option value="OPENING">Đang mở</option>
                  <option value="CLOSED">Đã đóng</option>
                </select>
              </div>
              <div className="form-group mb-2 w-50">
                <label
                  className="text-bold p-2"
                  style={{ fontWeight: "500" }}
                  htmlFor="ctTicket"
                >
                  Ticket
                </label>

                <select
                  defaultValue={ticket ? ticket : -1}
                  value={ticket}
                  onChange={(e) => setTicket(Number.parseInt(e.target.value))}
                  id="ctTicket"
                  className="form-control"
                >
                  <option value={-1}>--- Chọn khuyến mãi ---</option>
                  {tickets.length > 0 &&
                    tickets?.map((item) => (
                      <option value={item?.id}>{item?.name}</option>
                    ))}
                </select>
              </div>
            </div>
          )}
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctHot"
            >
              Sản phẩm được đánh giá hot
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
            Hủy
          </button>
          {product ? (
            <button
              onClick={() => handleEditProduct(product?.id)}
              className="btn"
              variant="btn"
            >
              Chỉnh sửa
            </button>
          ) : (
            <button onClick={handleCreateProduct} className="btn" variant="btn">
              Tạo
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="wrapper-container">
        <div class="row gap-15">
          <div class="col-lg-12">
            <h1 class="page-header">
              <span>
                <small>Danh sách</small>
              </span>{" "}
              sản phẩm
            </h1>
          </div>
          <div className="col-12 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-15">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm sản phẩm theo tên..."
                style={{ width: "24rem" }}
                className="form-control"
              />
              <button onClick={handleOpenModalCreate} className="btn">
                Tạo mới sản phẩm
              </button>
            </div>
            <div className="d-flex align-items-center gap-15">
              <button onClick={handleOpenCreateTicket} className="btn">
                Tạo mới khuyến mãi
              </button>
              <button onClick={handleOpenCreateShipFee} className="btn">
                Tạo mới mã giảm giá
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
                <th>Tiêu đề</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
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
                        Xóa
                      </Link>
                      <Link
                        onClick={() => handleOpenEditProduct(item?.id)}
                        className="edit-btn"
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
  );
};

export default Products;
