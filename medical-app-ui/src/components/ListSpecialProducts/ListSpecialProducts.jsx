import React from "react";
import SpecialProduct from "../SpecialProduct/SpecialProduct";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSpecialProduct,
  getListSpecialProductAction,
} from "../../redux/actions/serviceActions";

const ListSpecialProducts = () => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);
  const service = useSelector((state) => state?.service);
  const specialProducts = service?.specialProduct;
  const handleSeeMore = () => {
    setSeeMore(true);
  };
  const handleSeeLess = () => {
    setSeeMore(false);
  };
  useEffect(() => {
    if (seeMore) {
      dispatch(fetchAllSpecialProduct());
    } else {
      if (specialProducts.length > 0) {
        dispatch(getListSpecialProductAction(specialProducts.slice(0, 6)));
      }
    }
  }, [seeMore]);
  useEffect(() => {
    dispatch(fetchAllSpecialProduct());
  }, []);
  return (
    <section className="special-product py-5 home-wrapper-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm đặc biệt ( giảm giá )</h3>
          </div>
        </div>
        <div className="row">
          {specialProducts.length > 0 &&
            specialProducts?.map((product, index) => (
              <SpecialProduct key={product?.id} product={product} />
            ))}
        </div>
        <div className="row">
          <div
            className="col-12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {!seeMore ? (
              <button className="see-more" onClick={handleSeeMore}>
                Xem thêm
              </button>
            ) : (
              <button className="see-more" onClick={handleSeeLess}>
                Ẩn bớt
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListSpecialProducts;
