import React, { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { BsTicketPerforated } from "react-icons/bs";
import { Modal, Typography, Button, Box } from "@mui/material";

import { Meta, BreadCrum, Loading } from "../../components";

import styles from "./Checkout.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchBuyCart,
  fetchBuyProductOnly,
  getCartItem,
} from "../../redux/actions/userActions";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Checkout = () => {
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user;
  const cartItems = auth?.checkout;
  let total = auth?.buyedTotal;
  if (total == 0) {
    total = cartItems.reduce((total, item) => {
      return total + item?.amount * item?.product?.originalPrice;
    }, 0);
  }
  const useQuery = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(() => user?.address);
  const [voucher, setVoucher] = useState("");
  const [method, setMethod] = useState("banking")
  const orderHanlder = () => {
    switch (useQuery.get("actor")) {
      case "cart":
        dispatch(fetchBuyCart(user?.id));
        dispatch(getCartItem(user?.id));
        break;
      case "product":
        dispatch(fetchBuyProductOnly(user?.id, cartItems[0]?.product?.id, 1));
        dispatch(getCartItem(user?.id));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <div>
      {auth?.loading && <Loading />}
      <Meta title="Checkout here" />
      <BreadCrum title="Checkout here" />
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Đặt hàng thành công
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Bạn đã thực hiện đặt hàng thành công, tiếp tục đơn mới nhé !
            </div>
            <div class="modal-footer">
              <button
                onClick={() => navigate("/ordered")}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đơn hàng
              </button>
              <button
                onClick={() => navigate("/store")}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cửa hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row d-flex flex-column gap-15">
            <div className="col-12">
              <div className="info-shipping d-flex flex-column gap-15">
                <div className="d-flex align-items-center gap-10 info-shipping-title">
                  <ImLocation2 />
                  <h4>Địa Chỉ Nhận Hàng</h4>
                </div>
                <div className="d-flex align-items-center gap-10 info-shipping-address">
                  <h4 className="w-25">
                    {user?.fullName} - {user?.phoneNumber}
                  </h4>
                  <input
                    value={address}
                    className="form-control w-50"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                  <span className="text-danger">Mặc định</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="checkout-products">
                <div className="checkout-wrapper-heading py-3">
                  <h4 className="checkout-col-1">Product</h4>
                  <h4 className="checkout-col-2">Price</h4>
                  <h4 className="checkout-col-3">Quantity</h4>
                  <h4 className="checkout-col-4">Total Price</h4>
                </div>
                {cartItems?.map((item) => {
                  const totalPrice =
                    item?.amount * item?.product?.originalPrice;

                  return (
                    <div key={item?.id} className="checkout-wrapper-data py-3">
                      <div className="checkout-col-1 d-flex align-items-center gap-10">
                        <div className="w-25 checkout-wrapper-data__image">
                          <img
                            src={
                              "http://127.0.0.1:8887" +
                              "/products/" +
                              item?.product?.productImages[0]?.imageUrl
                            }
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="w-75">
                          <Link to={`/product/${item?.product?.id}`}>
                            <h5 className="title">{item?.product?.title}</h5>
                          </Link>
                          <p className="title">{item?.product?.descriptions}</p>
                        </div>
                      </div>
                      <div className="checkout-col-2">
                        <h5 className="price">
                          {item?.product?.originalPrice.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </h5>
                      </div>
                      <div className="checkout-col-3 d-flex align-items-center gap-10">
                        {item?.amount}
                      </div>
                      <div className="checkout-col-4">
                        {totalPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12">
              <div className="checkout-voucher">
                <div className="d-flex align-items-center gap-10 info-shipping-address">
                  <div className="d-flex align-items-center gap-10 checkout-voucher-title">
                    <BsTicketPerforated className="voucher-icons" />
                    <h4>Medical Voucher</h4>
                  </div>
                  <input
                    onChange={(event) => setVoucher(event.target.value)}
                    placeholder="Enter your voucher here "
                    value={voucher}
                    className="form-control w-25"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="checkout-method">
                <div className="info-shipping-address">
                  <div className="d-flex align-items-center gap-10 ">
                    <div className="d-flex align-items-center gap-10 checkout-method-title">
                      <h4>Checkout Method</h4>
                    </div>
                    <input
                      checked={method == "banking"}
                      type="checkbox"
                      id="banking-btn"
                      className="btn-3"
                      onClick={() => setMethod("banking")}
                    />
                      <label htmlFor="banking-btn">Banking QR</label>
                    <input
                      checked={method == "Off"}
                      type="checkbox"
                      id="shipOff-btn"
                      className="btn-3"
                      onClick={() => setMethod("Off")}
                    />
                      <label htmlFor="shipOff-btn">Thanh toán khi nhận hàng</label>
                  </div>
                  <div>
                    {method == "banking" && <div id="banking">
                      <div style={{width: "48%"}}>
                        <h5><b>Thực hiện thanh toán qua mã QR,</b> quý khách xác nhận mua hàng cần thực hiện thanh toán qua mã QR của hệ thống và chờ xác nhận ! </h5>
                      </div>
                      <img  src="/images/QR.jfif" alt="" />
                    </div>}
                    {method == "Off" && <div id="ship-off" >
                      <h6 className="w-25 mt-5">Thanh toán khi nhận hàng</h6>
                      <h7 className="22-50">
                        Phí thu hộ: 0Đ. || <span style={{marginLeft: "10px"}}>Áp dụng ưu đãi về phí vận chuyển để nhận ưu đãi nhé !</span>
                      </h7>
                    </div>}
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="checkout-submit d-flex flex-column justify-content-center align-items-end gap-15">
                <div className="d-flex align-items-center justify-content-between gap-45">
                  <h5
                    style={{ fontSize: 16, fontWeight: 400, marginRight: 70 }}
                  >
                    Tổng tiền hàng
                  </h5>
                  <span>
                    {total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-45">
                  <h5
                    style={{ fontSize: 16, fontWeight: 400, marginRight: 94 }}
                  >
                    Phí vận chuyển
                  </h5>
                  <span>0đ</span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-45">
                  <h5>Tổng thanh toán</h5>
                  <span className="totalCheckout">
                    {total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="checkout-submit-btn d-flex align-items-center justify-content-between">
                  <div>
                    <span>
                      Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                      Điều khoản Medical Shop
                    </span>
                  </div>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={orderHanlder}
                    className="btn-3"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
