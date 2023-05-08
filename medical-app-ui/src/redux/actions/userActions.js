import { UserAuth, paths } from "../../utils/constants/common";
import AuthServices from "../../utils/httpsRequests/AuthServices";

const authLoginAction = (payload) => {
  return {
    type: UserAuth.LOGIN,
    payload: payload,
  };
};
const authSignUpAction = (payload) => {
  return {
    type: UserAuth.REGISTER,
    payload: payload,
  };
};
const authResetPassword = (payload) => {
  return {
    type: UserAuth.FORGOT_PASSWORD,
    payload: payload,
  };
};
const loadAction = (payload) => {
  return {
    payload: payload,
    type: UserAuth.LOADING,
  };
};
const haveErrorAction = (error) => {
  return {
    type: UserAuth.ERROR,
    payload: error,
  };
};
export const isSuccessAction = (payload) => {
  return {
    type: UserAuth.SUCCESS,
    payload: payload,
  };
};
export const login =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    dispatch(loadAction(true));
    try {
      const res = await AuthServices.signIn(username, password);
      if (
        JSON.stringify(res).includes("Error") ||
        JSON.stringify(res).includes("500")
      ) {
        dispatch(
          haveErrorAction(
            "Tài khoản hoặc mật khẩu không chính xác, vui lòng nhập lại !"
          )
        );
      } else {
        dispatch(authLoginAction(res));
        localStorage.setItem("auth", JSON.stringify(res));
        navigate("/");
      }
    } catch (error) {
      dispatch(
        haveErrorAction(
          "Tài khoản hoặc mật khẩu không chính xác, vui lòng nhập lại !"
        )
      );
    } finally {
      dispatch(loadAction(false));
      dispatch(isSuccessAction(false));
    }
  };
export const registration = (body) => async (dispatch) => {
  dispatch(loadAction(true));
  try {
    console.log(body);
    const res = await AuthServices.signUp(body);
    if (res) {
      dispatch(authSignUpAction(res));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadAction(false));
    dispatch(isSuccessAction(false));
  }
};
export const authLogoutAction = () => {
  localStorage.removeItem("auth");
  return {
    type: UserAuth.LOG_OUT,
  };
};
export const resetPassword = (email, navigate) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.resetPassword(email)
    .then((res) => {
      if (
        JSON.stringify(res).includes("Error") ||
        JSON.stringify(res).includes("500")
      ) {
        dispatch(
          haveErrorAction(
            "Email này không tồn tại hoặc chưa được kích hoạt, vui lòng kiểm tra lại !"
          )
        );
      } else {
        dispatch(authResetPassword(res));
      }
    })
    .catch((rej) => {
      dispatch(
        haveErrorAction(
          "Email này không tồn tại hoặc chưa được kích hoạt, vui lòng kiểm tra lại !"
        )
      );
    })
    .finally(() => {
      dispatch(loadAction(false));
      dispatch(haveErrorAction(null));
      dispatch(isSuccessAction(false));
    });
};
/**Cart */
const addToCartAction = (payload) => {
  return {
    type: UserAuth.ADD_TO_CART,
    payload: payload,
  };
};
export const addToCart = (userId, productId, amount) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.addItemToCart(userId, productId, amount)
    .then((res) => {
      if (
        JSON.stringify(res).includes("Error") ||
        JSON.stringify(res).includes("500")
      ) {
        dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
      } else {
        dispatch(addToCartAction(true));
        dispatch(getCartItem(userId));
        alert("Thêm vào giỏ hàng thành công !");
      }
    })
    .catch((rej) => {
      dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
    })
    .finally(() => {
      dispatch(addToCartAction(false));
      dispatch(loadAction(false));
    });
};
export const deleteCartItemAction = (payload) => {
  return {
    type: UserAuth.DELETE_CARTITEM,
    payload: payload,
  };
};
export const deleteCart = (id, userId) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.deleteCartItem(id, userId)
    .then((res) => {
      if (
        JSON.stringify(res).includes("Error") ||
        JSON.stringify(res).includes("500")
      ) {
        dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
      } else {
        dispatch(deleteCartItemAction(true));
      }
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const changeAmountCartItemAction = (payload) => {
  return {
    type: UserAuth.CHANGE_QUANTITY_CARTITEM,
    payload: payload,
  };
};
export const changeAmountCartItem = (id, amount) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.updateQuantityCartItem(id, amount)
    .then((res) => {
      if (
        JSON.stringify(res).includes("Error") ||
        JSON.stringify(res).includes("500")
      ) {
        dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
      } else {
        dispatch(getCartItemById(id));
      }
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const getCartItemById = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getCartItemById(id)
    .then((res) => {
      dispatch(getCartItemByIdAction(res));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getCartItemByIdAction = (payload) => {
  return {
    type: UserAuth.GET_CARTIEM,
    payload: payload,
  };
};
const getCartItemAction = (payload) => {
  return {
    type: UserAuth.GET_CART,
    payload: payload,
  };
};
export const getCartItem = (id) => async (dispatch) => {
  try {
    dispatch(loadAction(true));
    const res = await AuthServices.getCartItem(id);
    dispatch(getCartItemAction(res.cartItemList));
  } catch (error) {
    console.log("error: ", error);
  } finally {
    dispatch(loadAction(false));
    dispatch(isSuccessAction(false));
  }
};
export const setCheckout = (payload) => {
  return {
    type: UserAuth.CHECKOUT,
    payload: payload,
  };
};
export const setTotalPriceToCheckoutAction = (total) => {
  return {
    type: UserAuth.SET_PRICE_CHECKOUT,
    payload: total,
  };
};
export const fetchBuyCart =
  (userId, payment, shipAddress) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.buyCart(userId, payment, shipAddress)
      .then((res) => {
        if (
          JSON.stringify(res).includes("Error") ||
          JSON.stringify(res).includes("500")
        ) {
          dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
        } else {
          setCheckout(null);
          dispatch(buyAction(true));
        }
      })
      .catch((rej) => {
        dispatch(haveErrorAction("Có lỗi, " + rej));
      })
      .finally(() => {
        dispatch(loadAction(false));
        dispatch(isSuccessAction(false));
      });
  };
export const fetchBuyProductOnly =
  (userId, productId, amount, payment, shipAddress) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.buyProductOnly(
      userId,
      productId,
      amount,
      payment,
      shipAddress
    )
      .then((res) => {
        if (
          JSON.stringify(res).includes("Error") ||
          JSON.stringify(res).includes("500")
        ) {
          dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
        } else {
          setCheckout(null);
          dispatch(buyAction(true));
        }
      })
      .catch((rej) => {
        dispatch(haveErrorAction("Có lỗi," + rej));
      })
      .finally(() => {
        dispatch(loadAction(false));
        dispatch(isSuccessAction(false));
      });
  };
const buyAction = (payload) => {
  return {
    type: UserAuth.BUY_PRODUCT,
    payload: payload,
  };
};
const commentProductAction = (payload) => {
  return {
    type: UserAuth.COMMENT,
    payload: payload,
  };
};
export const fetchCommentProduct =
  (userId, productId, comment) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.createComment(userId, productId, comment)
      .then((res) => {
        if (res) {
          console.log(res);
          dispatch(commentProductAction(res?.result?.data));
        }
      })
      .catch((rej) => {
        dispatch(haveErrorAction(rej));
      })
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
const getOrderItemAction = (payload) => {
  return {
    type: UserAuth.GET_ORDERS,
    payload: payload,
  };
};
export const fetchOrderItem = (userId) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getOrderItem(userId)
    .then((res) => {
      if (res) {
        dispatch(getOrderItemAction(res));
      }
    })
    .catch((rej) => {
      dispatch(haveErrorAction(rej));
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getAllShipFeesAction = (payload) => {
  return {
    type: UserAuth.GET_SHIPFEES,
    payload: payload,
  };
};
export const fetchAllShipFees = () => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getAllShipFees()
    .then((res) => {
      if (res) {
        dispatch(getAllShipFeesAction(res));
      }
    })
    .catch((rej) => {})
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getAllTicketAction = (payload) => {
  return {
    type: UserAuth.GET_TICKET,
    payload: payload,
  };
};
export const fetchAllTicket = () => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getAllTicket()
    .then((res) => {
      if (res) {
        dispatch(getAllTicketAction(res));
      }
    })
    .catch((rej) => {})
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchSubcription =
  (email, name, phoneNumber, comments) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.subcription(email, name, phoneNumber, comments)
      .then((res) => {
        if (res) {
          alert("Đăng ký thành công !");
        }
      })
      .catch((rej) => {})
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
