import styles from "./OrderItem.scss";
import React, { useEffect, useState } from "react";
import { VscServerProcess } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchChangeStatusOrder,
  fetchDeleteOrderItem,
} from "../../redux/actions/userActions";

const makeStyle = (status) => {
  if (status === "Processing") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "black",
    };
  } else if (status === "Processed") {
    return {
      background: "rgba(255, 173, 173, 0.56)",
      color: "white",
    };
  } else if (status === "Delivering") {
    return {
      background: "#ffe084",
      color: "white",
    };
  } else if (status === "Complete") {
    return {
      background: "rgb(89, 191, 255)",
      color: "white",
    };
  }
};

const OrderItem = ({
  id,
  amount,
  shipment,
  shipAddress,
  orderItems,
  user,
  option = "all",
}) => {
  const [change, setChange] = useState();
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();
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
  const handleChangeStatus = (e, item) => {
    let statusNew = status;
    if (statusNew?.find((a) => a?.id == item?.id)) {
      setStatus(statusNew?.filter((a) => a?.id != item?.id));
    }
    setStatus((prev) => [...prev, { id: item?.id, status: e.target.value }]);
  };
  const handleSubmit = (id) => {
    const currentStatus = status?.find((a) => a?.id == id);
    console.log(currentStatus);
    dispatch(fetchChangeStatusOrder(currentStatus?.id, currentStatus?.status));
    setChange({});
  };
  const handleDeleteOrederItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này ?")) {
      dispatch(fetchDeleteOrderItem(id));
    }
  };
  useEffect(() => {
    console.log(orderItems);
  }, []);
  return (
    <div className="orderItem-wrapper home-wrapper-2 py-3">
      <div className="">
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
              <div className="d-flex align-items-center gap-10">
                <h5 style={{ color: "#6a6a6a" }}>Tạo bởi:</h5>
                <span>{user?.fullName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="order-products">
            <div className="order-wrapper-heading py-3">
              <h4 className="orderItem-col-1">Sản phẩm</h4>
              <h4 className="orderItem-col-2">Giá</h4>
              <h4 className="orderItem-col-3">Số lượng mua</h4>
              <h4 className="orderItem-col-4">Tổng giá</h4>
              <h4 className="orderItem-col-4">Trạng thái</h4>
              <h4 className="orderItem-col-4">Chức năng</h4>
            </div>
            {orderItems?.map((item) => {
              const totalPrice = item?.amount * item?.product?.promotionPrice;
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
                      {item?.product?.promotionPrice.toLocaleString("it-IT", {
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
                    {change?.id == item?.id ? (
                      <select
                        value={
                          status?.find((it) => it?.id == item?.id)?.status ||
                          item?.status
                        }
                        onChange={(e) => handleChangeStatus(e, item)}
                        className="form-control"
                      >
                        <option value="Processing" name="processing" id="">
                          Chờ xác nhận / thanh toán
                        </option>
                        <option value="Processed" name="Processed" id="">
                          Đã xác nhận
                        </option>
                        <option value="Delivering" name="Delivering" id="">
                          Đang vận chuyển
                        </option>
                        <option value="Complete" name="Complete" id="">
                          Hoàn thành
                        </option>
                      </select>
                    ) : (
                      <span className="status" style={makeStyle(item?.status)}>
                        {item?.status}
                      </span>
                    )}
                  </div>
                  <div className="orderItem-col-4 d-flex align-items-center gap-10 justify-content-center">
                    {change?.id == item?.id ? (
                      <Link
                        onClick={() => handleSubmit(item?.id)}
                        className="btn-normal"
                        to={"#"}
                      >
                        Submit
                      </Link>
                    ) : (
                      <Link
                        onClick={() => setChange({ id: item?.id })}
                        className="delete-btn"
                        to={"#"}
                      >
                        Change
                      </Link>
                    )}
                    <Link
                      onClick={() => handleDeleteOrederItem(item?.id)}
                      className="edit-btn"
                      to={"#"}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-12">
          <div className="other-info d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-15">
              <h5>Địa chỉ giao hàng: </h5>
              <span style={{ color: "#ffc107" }}>{shipAddress}</span>
            </div>
            <div className="d-flex align-items-center gap-15">
              <h5>Hình thức thanh toán: </h5>
              <span style={{ color: "blue" }}>{shipment}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
