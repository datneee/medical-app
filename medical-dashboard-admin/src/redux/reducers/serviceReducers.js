import { Service } from "../../utils/constants/common";

const initState = {
  error: "",
  success: null,
  loading: false,
  products: [],
  productFeatured: [],
  product: null,
  categories: [],
  brands: [],
  pagination: {},
};
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case Service.GET_PRODUCTS:
      return {
        ...state,
        products: payload.data,
        pagination: payload.pagination,
      };
    case Service.GET_PRODUCT_FEATURED:
      return {
        ...state,
        productFeatured: payload
      };  
    case Service.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case Service.GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case Service.GET_PRODUCTS_BY_CATEGORY_ID:
      return {
        ...state,
        products: payload,
      };
    case Service.GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case Service.GET_BRAND:
      return {
        ...state,
        brands: payload,
      };
    default:
      return state;
  }
};
export default reducer;
