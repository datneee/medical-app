import { async } from "q";
import { UserAuth, paths } from "../../utils/constants/common";
import AuthServices from "../../utils/httpsRequests/AuthServices";
import { fetchAllCategory, fetchAllProducts } from "./serviceActions";

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
        localStorage.setItem("admin", JSON.stringify(res));
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
      dispatch(fetchAllUsers());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadAction(false));
    dispatch(isSuccessAction(false));
  }
};
export const fetchUpdateAccount = (id, body) => async (dispatch) => {
  dispatch(loadAction(true));
  try {
    const res = await AuthServices.updateAccount(id, body);
    if (res) {
      dispatch(fetchAllUsers());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadAction(false));
  }
};
export const authLogoutAction = () => {
  localStorage.removeItem("admin");
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
export const fetchDeleteAccount = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.deleteAccountById(id)
    .then((res) => {
      dispatch(fetchAllUsers());
    })
    .catch((rej) => {
      dispatch(haveErrorAction("Có lỗi, vui lòng thử lại !"));
    })
    .finally(() => {
      dispatch(loadAction(false));
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
        dispatch(changeAmountCartItemAction(true));
      }
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
      dispatch(isSuccessAction(false));
    });
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
export const fetchBuyCart = (userId) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.buyCart(userId)
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
  (userId, productId, amount) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.buyProductOnly(userId, productId, amount)
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
const createCategoryAction = (payload) => {
  return {
    type: UserAuth.CREATE_CATEGORY,
    payload: payload,
  };
};
export const fetchCreateCategory =
  (name, descriptions, selectedFile) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.createCategory(name, descriptions)
      .then(async (res) => {
        if (res) {
          if (selectedFile) {
            const formData = new FormData();
            formData.append("categoryId", res?.id);
            formData.append("files", selectedFile);
            const res2 = await AuthServices.createOrEditCategoryImage(formData);
          }

          dispatch(createCategoryAction(true));
          dispatch(fetchAllCategory());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
export const fetchEditCategory =
  (id, name, descriptions, status, selectedFile) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.editCategory(id, name, descriptions, status)
      .then(async (res) => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("categoryId", id);
          formData.append("files", selectedFile);
          const res2 = await AuthServices.createOrEditCategoryImage(formData);
        }
        dispatch(fetchAllCategory());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
export const fetchCreateProduct = (form, selectedFiles) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.createProduct(form)
    .then(async (res) => {
      if (res) {
        if (selectedFiles) {
          const formData = new FormData();
          for (const file of selectedFiles) {
            formData.append("files", file, file.name);
          }
          formData.append("productId", res?.id);
          const res2 = await AuthServices.createOrEditProductImages(formData);
        }

        dispatch(fetchAllProducts(1, 5));
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchEditProduct =
  (id, form, selectedFiles) => async (dispatch) => {
    dispatch(loadAction(true));
    await AuthServices.editProduct(id, form)
      .then(async (res) => {
        if (selectedFiles) {
          const formData = new FormData();
          formData.append("productId", id);
          for (const file of selectedFiles) {
            formData.append("files", file, file.name);
          }
          const res2 = await AuthServices.createOrEditProductImages(formData);
        }
        dispatch(fetchAllProducts(1, 5));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
export const fetchDeleteProduct = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.deleteProduct(id)
    .then((res) => {
      dispatch(fetchAllProducts(1, 5));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getAllUsersAction = (payload) => {
  return {
    type: UserAuth.GET_USERS,
    payload: payload,
  };
};
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getAllUsers()
    .then((res) => {
      dispatch(getAllUsersAction(res?.result.data));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getAllOrdersAction = (payload) => {
  return {
    type: UserAuth.GET_ORDERS,
    payload: payload,
  };
};
export const fetchAllOrders = () => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.getOrders()
    .then((res) => {
      dispatch(getAllOrdersAction(res));
    })
    .catch((rej) => {
      console.error(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchChangeStatusOrder = (id, status) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.changeStatusOrderItem(id, status)
    .then((res) => {
      dispatch(fetchAllOrders());
    })
    .catch((rej) => {
      console.error(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchDeleteOrderItem = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  await AuthServices.deleteOrderItemById(id)
    .then((res) => {
      dispatch(fetchAllOrders());
    })
    .catch((rej) => {
      console.error(rej);
    })
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