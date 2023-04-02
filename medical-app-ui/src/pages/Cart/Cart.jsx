import React, { useState } from "react";
import { Meta, BreadCrum } from "../../components";
import { AiFillDelete } from "react-icons/ai";

import styles from "./Cart.scss";
import { Link } from "react-router-dom";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 1000;
  const totalPrice = price * quantity;

  const handleChangeInput = (event) => {
    setQuantity(Number.parseInt(event.target.value));
  };

  const increasingQuantity = () => {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleReduceQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div>
      <Meta title="Your cart" />
      <BreadCrum title="Your cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-wrapper-heading py-3">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total Price</h4>
              </div>
              <div className="cart-wrapper-data py-3">
                <div className="cart-col-1 d-flex align-items-center">
                  <div className="w-25 cart-wrapper-data__image">
                    <img
                      src="/images/laptop.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="w-75">
                    <h5 className="title">Smartphone</h5>
                    <p className="title">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Soluta doloribus, deserunt rem fugiat in praesentium ipsum
                      debitis sint! Pariatur autem nihil ratione, fugiat nemo
                      nisi consectetur iste cumque reprehenderit dolores.
                    </p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">${price}</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-10">
                  <div className="buttons_added">
                    <input
                      onClick={handleReduceQuantity}
                      className="minus is-form"
                      type="button"
                      value="-"
                    />
                    <input
                      onChange={handleChangeInput}
                      aria-label="quantity"
                      className="input-qty"
                      name="quantity"
                      min={1}
                      max={100}
                      type="number"
                      value={quantity}
                    />
                    <input
                      onClick={increasingQuantity}
                      className="plus is-form"
                      type="button"
                      value="+"
                    />
                  </div>
                  <AiFillDelete className="delete-btn-itemCart" />
                </div>
                <div className="cart-col-4">${totalPrice}</div>
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/store" className="button">
                    Continue to shopping
                  </Link>
                  <div className="total-end-cart d-flex flex-column align-items-end gap-10">
                    <h4>Tổng thanh toán: $100000</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to="/checkout" className="button mt-2">
                      Mua hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
