import { Service, paths } from "../../utils/constants/common";
import ProductServices from "../../utils/httpsRequests/ProducServices";

const getProductAction = (products) => {
  return {
    type: Service.GET_PRODUCTS,
    payload: products,
  };
};
export const fetchAllProducts = (page, perPage) => async (dispatch) => {
  await ProductServices.getAll(page, perPage)
    .then((res) => {
      dispatch(getProductAction(res.data));
    })
    .catch((rej) => {
      console.log(rej);
    });
};
