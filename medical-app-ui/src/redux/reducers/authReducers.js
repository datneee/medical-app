import { UserAuth } from "../../utils/constants/common";

const initState = {
  error: null,
  success: false,
  token: "",
  user: null,
  id: "",
  cart: [],
  buyedTotal: null,
  checkout: null,
  order: [],
  loading: false,
  message: "",
  comment: null
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case UserAuth.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case UserAuth.SUCCESS:
      return {
        ...state,
        success: payload,
      };
    case UserAuth.BUY_PRODUCT:
      return {
        ...state,
        success: true,
      };
    case UserAuth.ERROR:
      return {
        ...state,
        error: payload,
      };
    case UserAuth.LOGIN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case UserAuth.REGISTER:
      return {
        ...state,
        message: payload,
      };

    case UserAuth.LOG_OUT:
      return {
        error: "",
        token: "",
        user: "",
        id: "",
      };
    case UserAuth.ADD_TO_CART:
      return {
        ...state,
        success: payload,
      };
    case UserAuth.CHECKOUT:
      return {
        ...state,
        checkout: payload,
      };
    case UserAuth.GET_CART:
      return {
        ...state,
        cart: payload,
      };
    case UserAuth.DELETE_CARTITEM:
      return {
        ...state,
        success: payload,
      };
    case UserAuth.CHANGE_QUANTITY_CARTITEM:
      return {
        ...state,
        success: payload,
      };
    case UserAuth.SET_PRICE_CHECKOUT:
      return {
        ...state,
        buyedTotal: payload,
      };
    case UserAuth.COMMENT:
      return {
        ...state,
        comment: payload
      }
    default:
      return { ...state };
  }
};

export default reducer;
