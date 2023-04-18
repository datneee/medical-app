import React from "react";
import styles from "./Orders.scss";
import { Loading, Meta, OrderItem } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllOrders } from "../../redux/actions/userActions";

const Orders = () => {
  const [selectFilter, setSelectFilter] = useState("all");
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const orders = auth?.orders;
  const handleChangeSelectFilter = (e) => {
    setSelectFilter(e.target.value);
  };
  const handleSelectStatus = () => {};
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);
  return (
    <div>
      <Meta title={"Management orders"} />
      {auth?.loading && <Loading />}
      <div className="main-order-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row bg-white">
            <div className="col-12 order-heading mb-4">
              <div className="d-flex align-items-center gap-10">
                <p className="mb-0 d-block">Lọc đơn hàng:</p>
                <select
                  onChange={handleChangeSelectFilter}
                  value={selectFilter}
                  name=""
                  id=""
                  className="form-control form-select"
                >
                  <option value="all">Tất cả</option>
                  <option value="Processing">Chờ xác nhận</option>
                  <option value="Processed">Đã xác nhận</option>
                  <option value="Delivering">Đang vận chuyển</option>
                  <option value="Complete">Hoàn thành</option>
                </select>
              </div>
            </div>
            <div className="col-12 order-container">
              {orders?.map((item) => (
                <OrderItem
                  option={selectFilter}
                  id={item?.id}
                  amount={item?.amount}
                  orderItems={item?.orderItems}
                  handleSelectStatus={handleSelectStatus}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
