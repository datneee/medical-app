import React, { useEffect, useState } from "react";
import styles from "./Customers.scss";
import { Loading, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAllUsers,
  fetchDeleteAccount,
  fetchUpdateAccount,
  registration,
} from "../../redux/actions/userActions";

const Customers = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [account, setAccount] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [isChangePassword, setChangePassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user;
  const users = auth?.users;
  const message = auth?.message;
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const resetForm = () => {
    setUsername("");
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setStatus("");
    setRole("");
  };
  const setForm = (account) => {
    setUsername(account?.username);
    setFullName(account?.fullName);
    setEmail(account?.email);
    setPassword(account?.password);
    setPhone(account?.phoneNumber);
    setAddress(account?.address);
    setStatus(account?.status);
    setRole(account?.role);
  };
  const handleOpenModalCreate = () => {
    setAccount(null);
    resetForm();
    handleShow();
  };
  const handleOpenEditAccount = (id) => {
    const acc = users?.find((item) => item?.id == id);
    setAccount(acc);
    setForm(acc);
    setShow(true);
  };
  const handleOpenViewAccount = (id) => {
    const acc = users?.find((item) => item?.id == id);
    setAccount(acc);
    setForm(acc);
    setShow(true);
  };
  const validate = () => {
    const error = null;
    if (!username) {
      error.username = "Required !";
    }
    if (!fullName) {
      error.fullName = "Required !";
    }
    if (!phoneNumber) {
      error.fullName = "Required !";
    }
    if (!address) {
      error.address = "Required !";
    }
    if (!email) {
      error.email = "Required !";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Invalid email address !";
    }
    if (!password) {
      error.password = "Required !";
    }
    setErrors(error);
  };
  const handleDeleteAccount = (id) => {
    if (window.confirm("Xác nhận xóa tài khoản #" + id)) {
      dispatch(fetchDeleteAccount(id));
    }
  };
  const handleCreateAccount = () => {
    validate();
    if (!errors) {
      dispatch(
        registration({
          username,
          email,
          fullName,
          password,
          phoneNumber,
          address,
        })
      );
      setShow(false);
    }
  };
  const handleEditAccount = (id) => {
    validate();
    if (!errors) {
      const form = {
        username,
        email,
        fullName,
        phoneNumber,
        address,
        status,
        role,
      };
      if (newPassword) {
        form.password = newPassword;
      }
      dispatch(fetchUpdateAccount(id, form));
      setShow(false);
    }
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div>
      {auth.loading && <Loading />}
      <Meta title={"Customers"} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!account && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Create Account
              </label>
            )}
            {account && (
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctName"
              >
                Edit Account
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
              Username
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              type="text"
              id="ctname"
              placeholder="Enter username ..."
            />
            {errors?.username && (
              <span className="red-warning p-2">{errors?.username} </span>
            )}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctFullName"
            >
              FullName
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-control"
              type="text"
              id="ctFullName"
              placeholder="Enter fullName ..."
            />
            {errors?.fullName && (
              <span className="red-warning p-2">{errors?.fullName} </span>
            )}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctEmail"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              type="text"
              id="ctEmail"
              placeholder="Enter email ..."
            />
            {errors?.email && (
              <span className="red-warning p-2">{errors?.email} </span>
            )}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctPhone"
            >
              Phone Number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              type="text"
              id="ctPhone"
              placeholder="Enter Phone Number ..."
            />
            {errors?.phone && (
              <span className="red-warning p-2">{errors?.phone} </span>
            )}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctAddress"
            >
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              row="3"
              className="form-control"
              type="text"
              id="ctAddress"
              placeholder="Enter address ..."
            />
            {errors?.address && (
              <span className="red-warning p-2">{errors?.address} </span>
            )}
          </div>
          <div className="form-group mb-2">
            <label
              className="text-bold p-2"
              style={{ fontWeight: "500" }}
              htmlFor="ctPassword"
            >
              Password
              {account?.id == user?.id || account?.role == "CLIENT" ? (
                <a
                  className="text-cover"
                  onClick={() => setChangePassword((prev) => !prev)}
                >
                  Change Password
                </a>
              ) : (
                ""
              )}
            </label>
            <input
              value={password}
              disabled={account != null}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="password"
              id="ctPassword"
              placeholder="Enter password ..."
            />
            {errors?.password && (
              <span className="red-warning p-2">{errors?.password} </span>
            )}

            {isChangePassword && (
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control mt-4"
                type="password"
                placeholder="Enter new password ..."
              />
            )}
          </div>
          {account && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctStatus"
              >
                Status
              </label>

              <select
                value={status}
                defaultValue={account?.status}
                onChange={(e) => setStatus(e.target.value)}
                id="ctStatus"
                className="form-control"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="NOT_ACTIVE">NOT_ACTIVE</option>
              </select>
            </div>
          )}
          {account && (
            <div className="form-group mb-2">
              <label
                className="text-bold p-2"
                style={{ fontWeight: "500" }}
                htmlFor="ctRole"
              >
                Role
              </label>
              <span className="text-warning">
                Lưu ý kiểm tra kỹ thông tin chính xác khi đăng ký tài khoản
                admin
              </span>
              <select
                value={role}
                defaultValue={account?.role}
                onChange={(e) => setRole(e.target.value)}
                id="ctRole"
                className="form-control"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="CLIENT">CLIENT</option>
              </select>
            </div>
          )}
        </Modal.Body>
        {(account?.role == "CLIENT" || account?.id == user?.id || !account) && (
          <Modal.Footer>
            <button
              className="btn-normal"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            {account ? (
              <button
                onClick={() => handleEditAccount(account?.id)}
                className="btn"
                variant="btn"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleCreateAccount}
                className="btn"
                variant="btn"
              >
                Create
              </button>
            )}
          </Modal.Footer>
        )}
      </Modal>
      <div className="wrapper-container">
        <div className="row gap-15">
          <div className="col-lg-12">
            <h1 className="page-header">
              <span>
                <small>Danh sách</small>
              </span>
              khách hàng
            </h1>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center gap-15">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm tài khoản theo tên..."
                style={{ width: "24rem" }}
                className="form-control"
              />
              <button onClick={handleOpenModalCreate} className="btn">
                Create new account
              </button>
            </div>
          </div>
          <table
            className="table table-striped table-bordered table-hover"
            id="dataTables-excemple"
          >
            <thead>
              <tr align="center">
                <th>ID</th>
                <th>Username</th>
                <th>FullName</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody
              style={{
                verticalAlign: "middle",
                overflow: "auto",
              }}
            >
              {users?.map((item) => (
                <tr key={item?.id} className="odd gradeX" align="center">
                  <td>#{item?.id}</td>
                  <td>
                    <span>
                      <b>{item?.username}</b>
                    </span>
                  </td>
                  <td>
                    <span>{item?.fullName}</span>
                  </td>
                  <td>
                    <span>{item?.phoneNumber}</span>
                  </td>
                  <td>
                    <span>{item?.address}</span>
                  </td>
                  <td>
                    <span>{item?.email}</span>
                  </td>
                  <td>
                    <span>{item?.status}</span>
                  </td>
                  <div className="center">
                    {item?.role == "CLIENT" || item?.id == user?.id ? (
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        {item?.id != user?.id && (
                          <Link
                            onClick={() => handleDeleteAccount(item?.id)}
                            className="delete-btn"
                            to={"#"}
                          >
                            Delete
                          </Link>
                        )}
                        <Link
                          onClick={() => handleOpenEditAccount(item?.id)}
                          className="edit-btn"
                          to={"#"}
                        >
                          Edit
                        </Link>
                      </div>
                    ) : (
                      <span>
                        <Link
                          onClick={() => handleOpenViewAccount(item?.id)}
                          className="view-btn"
                          to={"#"}
                        >
                          View
                        </Link>
                      </span>
                    )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
