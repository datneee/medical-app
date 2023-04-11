export const INCORRECT_USERNAME =
  "Thông tin tài khoản hoặc mật khẩu không chính xác !";
export const ERROR = "Có lỗi xảy ra ! Vui lòng thử lại sau.";
export const UserAuth = {
  LOGIN: "LOGIN",
  SUCCESS: "SUCCESS !",
  ERROR: "ERROR",
  LOADING: "LOADING ACTION",
  LOG_OUT: "SIGN OUT",
  CHECKOUT: "CHECKOUT",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT PASSWORD",
  INCORRECT: "INCORRECT INFO",
  STOP_ACTIONS: "STOP",
  LOG_PROFILE: "ACCESS PROFILE",
  GET_CART: "GET CART",
  DELETE_CARTITEM: "DELETE CART ITEM",
  CHANGE_QUANTITY_CARTITEM: "CHANGE QUANTITY CARTITEM",
  ADD_TO_CART: "ADD ITEM TO CART",
  BUY_CART: "BUY ITEMS IN CART",
  BUY_PRODUCT: "BUY PRODUCT",
  GET_ORDERS: "GET ORDERS",
  SET_PRICE_CHECKOUT: "SET PRICE CHECKOUT",
  COMMENT: "COMMENT"
};
export const Service = {
  LOADING: "LOADING ACTION",
  GET_PRODUCTS: "GET LIST PRODUCTS",
  GET_PRODUCTS_BY_CATEGORY_ID: "GET LIST PRODUCTS BY CATEGORY ID",
  GET_PRODUCT: "GET 1 PRODUCT",
  GET_CATEGORIES: "GET LIST CATEGORIES",
  GET_BRAND: "GET LIST BRANDS",
  ERROR: "HAVE AN ERROR",
};
export const paths = {
  PRODUCTS: "/products",
  GET_PRODUCTS_BY_CATEGORY_ID: "/products/inCategory",
  BUY_PRODUCT: "/products/buy",
  CATEGORIES: "/categories",
  BRANDS: "/brands",
  LOGIN: "/auth/login",
  REGISTRATION: "/auth/signup",
  RESET_PASSWORD: "/auth/reset-password",
  GET_CART: "/carts",
  GET_CARTITEM: "/cartitem",
  ADD_TO_CART: "/carts/addCartItem",
  BUY_CART: "/carts/buyListCartItems",
  GET_ORDER: "/orders",
  RATING: "/rates"
};
