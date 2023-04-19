import React from "react";
import SpecialProduct from "../SpecialProduct/SpecialProduct";
import { useState, useEffect } from "react";

const ListSpecialProducts = ({ products }) => {
  const [specialProducts, setSpecialProducts] = useState();

  const [seeMore, setSeeMore] = useState(false);

  const handleSeeMore = () => {
    setSpecialProducts(products);
    setSeeMore(true);
  };
  const handleSeeLess = () => {
    setSpecialProducts(products.slice(0, 6));
    setSeeMore(false);
  };
  useEffect(() => {
    setSpecialProducts(products.slice(0, 6));
    setSeeMore(false);
  }, []);
  return (
    <section className="special-product py-5 home-wrapper-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {specialProducts
            ? specialProducts.map((product, index) => (
                <SpecialProduct key={product?.id} product={product} />
              ))
            : products.map((product, index) => (
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
                See more
              </button>
            ) : (
              <button className="see-more" onClick={handleSeeLess}>
                See less
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListSpecialProducts;
