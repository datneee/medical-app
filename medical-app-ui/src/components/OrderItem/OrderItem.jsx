import styles from "./OrderItem.scss";
import React, { useEffect, useState } from "react";
import { VscServerProcess } from "react-icons/vsc";
import { Link } from "react-router-dom";

const OrderItem = ({ id, amount, orderItems, option = "all" }) => {
  if (option != "all") {
    switch (option) {
      case "Processing":
        orderItems = orderItems.filter((item) => item?.status == "Processing");
        break;
      case "Processed":
        orderItems = orderItems.filter((item) => item?.status == "Processed");
        break;
      case "Delivering":
        orderItems = orderItems.filter((item) => item?.status == "Delivering");
        break;
      case "Complete":
        orderItems = orderItems.filter((item) => item?.status == "Complete");
        break;
      default:
        break;
    }
  }

  useEffect(() => {}, []);
  return (
    <div className="orderItem-wrapper home-wrapper-2 py-3">
      <div className="container-xxl">
        <div className="col-12">
          <div className="info-shipping d-flex align-items-center justify-content-between gap-15">
            <div className="d-flex align-items-center gap-10 info-shipping-title">
              <VscServerProcess style={{ fontSize: 24 }} />
              <h4>Đơn hàng: </h4>
              <span>#{id}</span>
              <div
                style={{ marginLeft: "16px" }}
                className="d-flex align-items-center gap-10"
              >
                <h5 style={{ color: "#6a6a6a" }}>Số lượng:</h5>
                <span>{amount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="order-products">
            <div className="order-wrapper-heading py-3">
              <h4 className="orderItem-col-1">Product</h4>
              <h4 className="orderItem-col-2">Price</h4>
              <h4 className="orderItem-col-3">Quantity</h4>
              <h4 className="orderItem-col-4">Total Price</h4>
              <h4 className="orderItem-col-4">Status</h4>
            </div>
            {orderItems?.map((item) => {
              const totalPrice = item?.amount * item?.product?.originalPrice;
              return (
                <div key={item?.id} className="orderItem-wrapper-data py-3">
                  <div className="orderItem-col-1 d-flex align-items-center gap-10">
                    <div className="w-25 orderItem-wrapper-data__image">
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
                  <div className="orderItem-col-2">
                    <h5 className="price">
                      {item?.product?.originalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h5>
                  </div>
                  <div className="orderItem-col-3 d-flex align-items-center gap-10">
                    {item?.amount}
                  </div>
                  <div className="orderItem-col-4">
                    {totalPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div className="orderItem-col-5">
                    <span>{item?.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
