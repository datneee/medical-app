import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAmountCartItem,
  isSuccessAction,
  deleteCart,
  getCartItem,
} from "../../redux/actions/userActions";
import { useDebounce } from "../../hooks";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";

const CartItem = ({ className, CartItem }) => {
  const [quantity, setQuantity] = useState(CartItem?.amount);
  const [editQuantity, setEditQuantity] = useState({
    id: "",
    status: false,
  });
  if (editQuantity.id == CartItem?.id && editQuantity.status) {
    console.log("replace cartItem: " + CartItem?.id);
  }
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user;
  let _cartItem = auth?.cartItem;

  const totalPrice = quantity * CartItem?.product?.promotionPrice;
  const handleChangeInput = (event) => {
    const value = event.target.value;
    if (!value || value == 0) {
      setQuantity(CartItem?.amount);
    } else {
      setQuantity(value);
    }
  };
  const increasingQuantity = (id) => {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
    setEditQuantity({
      id,
      status: true,
    });
    dispatch(changeAmountCartItem(id, quantity + 1));
    window.location.reload();
  };
  const handleReduceQuantity = (id) => {
    if (quantity > 1) {
      setQuantity(quantity + 1);
    }
    setEditQuantity({
      id,
      status: true,
    });
    dispatch(changeAmountCartItem(id, quantity <= 1 ? 1 : quantity - 1));
    window.location.reload();
  };
  const debouncedQuantity = useDebounce(quantity, 650);
  const deleteCartItemHandler = () => {
    if (
      window.confirm("Xóa " + CartItem?.product?.title + " ra khỏi giỏ hàng ?")
    ) {
      dispatch(deleteCart(CartItem?.id, user?.id));
      window.location.reload();
    }
  };
  const handleBlur = (id) => {
    setEditQuantity({
      id,
      status: true,
    });
    if (CartItem?.amount != quantity) {
      dispatch(changeAmountCartItem(id, quantity));
      window.location.reload();
    }
  };

  useEffect(() => {}, []);
  return (
    <div className={className}>
      <div className="cart-col-1 d-flex align-items-center gap-10">
        <div className="w-25 cart-wrapper-data__image">
          <img
            src={
              "http://127.0.0.1:8887" +
              "/products/" +
              CartItem?.product?.productImages[0]?.imageUrl
            }
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="w-75">
          <Link to={`/product/${CartItem?.product?.id}`}>
            <h5 className="title">{CartItem?.product?.title}</h5>
          </Link>
          <p className="title">{CartItem?.product?.descriptions}</p>
        </div>
      </div>
      <div className="cart-col-2">
        {CartItem?.product?.promotionPrice ==
        CartItem?.product?.originalPrice ? (
          <div className="border-bottom product-rate">
            <span className="">
              {CartItem?.product?.promotionPrice?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        ) : (
          <div className="border-bottom product-rate ">
            <span className="red-p">
              {CartItem?.product?.promotionPrice?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>{" "}
            &nbsp;
            <strike>
              {CartItem?.product?.originalPrice?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </strike>
          </div>
        )}
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-10">
        <div className="buttons_added">
          <input
            onClick={() => handleReduceQuantity(CartItem?.id)}
            className="minus is-form"
            type="button"
            value="-"
          />
          <input
            onChange={handleChangeInput}
            onBlur={() => handleBlur(CartItem?.id)}
            aria-label="quantity"
            className="input-qty"
            name="quantity"
            min={1}
            max={100}
            type="number"
            value={quantity}
          />
          <input
            onClick={() => increasingQuantity(CartItem?.id)}
            className="plus is-form"
            type="button"
            value="+"
          />
        </div>
        <AiFillDelete
          onClick={deleteCartItemHandler}
          className="delete-btn-itemCart"
        />
      </div>
      <div className="cart-col-4">
        {totalPrice.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </div>
    </div>
  );
};

export default CartItem;
