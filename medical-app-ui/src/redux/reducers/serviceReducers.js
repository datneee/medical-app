import { Service } from "../../utils/constants/common";

const initState = {
  error: "",
  products: [],
  categories: [],
};
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case Service.GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case Service.GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
export default reducer;
