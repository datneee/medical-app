import React, { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { BsTicketPerforated } from "react-icons/bs";

import { Meta, BreadCrum } from "../../components";

import styles from "./Checkout.scss";

const Checkout = () => {
  const [address, setAddress] = useState("38, Nguyen Xa, Ha Noi");
  const [voucher, setVoucher] = useState("");

  //   document.getElementById("banking-btn").style.color = "#ee2c4a";
  //   document.getElementById("ship-off").style.display = "none";

  const handleClickBanking = () => {
    // document.getElementById("banking").style.display = "block";
    // document.getElementById("banking-btn").style.color = "#ee2c4a";
    // document.getElementById("shipOff-btn").style.color = "inherit";
    // document.getElementById("ship-off").style.display = "none";
  };
  const handleClickShipOff = () => {
    // document.getElementById("banking").style.display = "none";
    // document.getElementById("banking-btn").style.color = "inherit";
    // document.getElementById("shipOff-btn").style.color = "#ee2c4a";
    // document.getElementById("ship-off").style.display = "block";
  };

  useEffect(() => {});
  return (
    <div>
      <Meta title="Checkout here" />
      <BreadCrum title="Checkout here" />
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
                  <h4 className="w-25">Phạm Văn Đạt - 0978415545</h4>
                  <input value={address} className="form-control w-50" />
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
                <div className="checkout-wrapper-data py-3">
                  <div className="checkout-col-1 d-flex align-items-center">
                    <div className="w-25 checkout-wrapper-data__image">
                      <img
                        src="/images/laptop.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="w-75">
                      <h5 className="title">Smartphone</h5>
                      <p className="title">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Soluta doloribus, deserunt rem fugiat in
                        praesentium ipsum debitis sint! Pariatur autem nihil
                        ratione, fugiat nemo nisi consectetur iste cumque
                        reprehenderit dolores.
                      </p>
                    </div>
                  </div>
                  <div className="checkout-col-2">
                    <h5 className="price">${1000}</h5>
                  </div>
                  <div className="checkout-col-3 d-flex align-items-center gap-10">
                    1
                  </div>
                  <div className="checkout-col-4">${12312001}</div>
                </div>
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
                    <button
                      id="banking-btn"
                      className="btn-3"
                      onClick={handleClickBanking}
                    >
                      Banking QR
                    </button>
                    <button
                      id="shipOff-btn"
                      className="btn-3"
                      onClick={handleClickShipOff}
                    >
                      Thanh toán khi nhận hàng
                    </button>
                  </div>
                  <div>
                    <div id="banking">
                      <img src="/images/QR.jfif" alt="" />
                    </div>
                    <div id="ship-off">
                      <h4 className="w-25">Thanh toán khi nhận hàng</h4>
                      <h4 className="22-50">
                        Phí thu hộ: 0Đ. Áp dụng ưu đãi về phí vận chuyển
                      </h4>
                    </div>
                  </div>
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
