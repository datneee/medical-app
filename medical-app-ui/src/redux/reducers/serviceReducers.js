import { Service } from "../../utils/constants/common";

const initState = {
  error: "",
  products: [],
};
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case Service.GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
export default reducer;
