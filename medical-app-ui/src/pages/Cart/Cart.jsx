import React, { useEffect, useState } from "react";
import { Meta, BreadCrum, CartItem, Loading } from "../../components";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Cart.scss";
import { Link, useNavigate } from "react-router-dom";

import {
  getCartItem,
  setTotalPriceToCheckoutAction,
  setCheckout,
} from "../../redux/actions/userActions";
import { loadAction } from "../../redux/actions/serviceActions";

const Cart = () => {
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user;
  const cartItems = auth?.cart;

  const cartId = user?.cart?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const priceCheckout = cartItems?.reduce((total, item) => {
    return total + item?.amount * item?.product?.originalPrice;
  }, 0);

  const handleCheckoutCart = () => {
    if (cartItems.length > 0) {
      dispatch(setCheckout(cartItems));
      dispatch(loadAction(true));
      setTimeout(() => {
        dispatch(loadAction(false));
        navigate("/checkout?actor=cart");
      }, 1000);
    } else {
      alert("Không có sản phẩm nào trong giỏ hàng, mua sắm thêm nào !");
    }
  };
  useEffect(() => {
    dispatch(getCartItem(cartId));
    dispatch(setTotalPriceToCheckoutAction(priceCheckout));
  }, []);
  return (
    <div>
      <Meta title="Your cart" />
      <BreadCrum title="Your cart" />
      {auth?.loading ? (
        <Loading />
      ) : (
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
                {cartItems?.map((item) => (
                  <CartItem
                    key={item.id}
                    CartItem={item}
                    className={"cart-wrapper-data py-3"}
                  />
                ))}

                <div className="col-12 py-2 mt-4">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Link to="/store" className="button">
                      Continue to shopping
                    </Link>
                    <div className="total-end-cart d-flex flex-column align-items-end gap-10">
                      <h4>
                        Tổng thanh toán:{" "}
                        {priceCheckout?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h4>
                      <p>Taxes and shipping calculated at checkout</p>
                      <button
                        onClick={handleCheckoutCart}
                        className="button mt-2"
                      >
                        Mua hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
