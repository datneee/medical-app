import React, { useEffect, useState } from "react";
import styles from "./Categories.scss";
import { Loading, Meta } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../redux/actions/serviceActions";
import { useDebounce } from "../../hooks";
const Categories = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  let categories = service?.categories;
  if (inputValue.trim()) {
    categories = categories.filter((category) => {
      return category?.name.toLowerCase().includes(inputValue.toLowerCase());
    });
  }
  const debouncedSearchValue = useDebounce(inputValue, 720);
  const handleSearchCategory = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [debouncedSearchValue]);
  return (
    <>
      {service?.loading && <Loading />}
      <Meta title={"Management categories"} />
      <div className="container-xxl mt-5">
        <div class="row gap-15">
          <div class="col-lg-12">
            <h1 class="page-header">
              Category
              <small> List</small>
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
              <button className="btn">Create new category</button>
            </div>
          </div>
          <table
            class="table table-striped table-bordered table-hover"
            id="dataTables-example"
          >
            <thead>
              <tr align="center">
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
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
              {categories?.map((item) => (
                <tr class="odd gradeX" align="center">
                  <td>#{item?.id}</td>
                  <td>
                    <img
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
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos, voluptatum nam. A necessitatibus soluta
                      debitis impedit numquam recusandae corporis velit suscipit
                      maiores, eaque, repellendus vel in inventore error
                      voluptates odit!
                    </span>
                  </td>
                  <td>
                    <span>{item?.status}</span>
                  </td>
                  <td className="center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <a href="">Delete</a>
                      <a href="">Edit</a>
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
