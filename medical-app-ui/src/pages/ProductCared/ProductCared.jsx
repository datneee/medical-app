import React from "react";
import { BreadCrum, Meta, ProductCard } from "../../components";

const ProductCared = () => {
  return (
    <>
      <Meta title="Product you cared" />
      <BreadCrum title="Product you cared" />

      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
            <ProductCard grid={3} wishlist={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCared;
