import React, { useState } from "react";
import styles from "./Customers.scss";
import { Loading, Meta } from "../../components";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

const Customers = () => {
  // const [show, setShow] = useState(false);
  // const [user, setUser] = useState(null);
  // const handleClose = () => {
  //   setShow(false);
  // };
  // const handleShow = () => setShow(true);
  // const auth = useSelector((state) => state?.auth);
  // let users = auth?.return(
  //   <>
  //     {auth?.loading && <Loading />}
  //     <Meta title={"Management customers"} />
  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>
  //           {!category && (
  //             <label
  //               className="text-bold p-2"
  //               style={{ fontWeight: "500" }}
  //               htmlFor="ctName"
  //             >
  //               Create Category
  //             </label>
  //           )}
  //           {category && (
  //             <label
  //               className="text-bold p-2"
  //               style={{ fontWeight: "500" }}
  //               htmlFor="ctName"
  //             >
  //               Edit Category
  //             </label>
  //           )}
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <div className="form-group mb-2">
  //           <label
  //             className="text-bold p-2"
  //             style={{ fontWeight: "500" }}
  //             htmlFor="ctName"
  //           >
  //             Category Name
  //           </label>
  //           <input
  //             onChange={(e) => setName(e.target.value)}
  //             value={name}
  //             className="form-control"
  //             type="text"
  //             id="ctname"
  //             placeholder="Enter category name ..."
  //           />
  //         </div>
  //         {category && (
  //           <div className="form-group mb-2">
  //             <label
  //               className="text-bold p-2"
  //               style={{ fontWeight: "500" }}
  //               htmlFor="ctName"
  //             >
  //               Category Status
  //             </label>
  //             <select
  //               defaultValue={status}
  //               className="form-control"
  //               onChange={(e) => setStatus(e.target.value)}
  //             >
  //               <option
  //                 selected={category?.status == "NOT_ACTIVE"}
  //                 value="NOT_ACTIVE"
  //               >
  //                 NOT ACTIVE
  //               </option>
  //               <option selected={category?.status == "ACTIVE"} value="ACTIVE">
  //                 ACTIVE
  //               </option>
  //             </select>
  //           </div>
  //         )}
  //         <div className="form-group mb-2">
  //           <label
  //             className="text-bold p-2"
  //             style={{ fontWeight: "500" }}
  //             htmlFor="ctName"
  //           >
  //             Category descriptions
  //           </label>
  //           <textarea
  //             onChange={(e) => setDescriptions(e.target.value)}
  //             value={descriptions}
  //             row="3"
  //             className="form-control"
  //             type="text"
  //             id="ctname"
  //             placeholder="Enter category name ..."
  //           />
  //         </div>
  //         <div className="form-group mb-2 d-flex gap-10 flex-column">
  //           <input
  //             onChange={handleChooseImage}
  //             class="form-control-file"
  //             type="file"
  //           />
  //           <img
  //             id="image"
  //             src={`http://127.0.0.1:8887/categories/${category?.categoryImages[0]?.imageUrl}`}
  //             alt="img"
  //             className="img-fluid"
  //           />
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <button
  //           className="btn-normal"
  //           variant="secondary"
  //           onClick={handleClose}
  //         >
  //           Cancel
  //         </button>
  //         {category ? (
  //           <button className="btn" variant="btn" onClick={handleEditCategory}>
  //             Edit
  //           </button>
  //         ) : (
  //           <button
  //             className="btn"
  //             variant="btn"
  //             onClick={handleCreateCategory}
  //           >
  //             Create
  //           </button>
  //         )}
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // );
};

export default Customers;
