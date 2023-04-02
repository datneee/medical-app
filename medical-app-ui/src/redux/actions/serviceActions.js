import { Service, paths } from "../../utils/constants/common";
import ProductServices from "../../utils/httpsRequests/ProducServices";

const getProductAction = (products) => {
  return {
    type: Service.GET_PRODUCTS,
    payload: products,
  };
};
const getCategoryAction = (categories) => {
  return {
    type: Service.GET_CATEGORIES,
    payload: categories,
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
export const fetchAllCategory = () => async (dispatch) => {
  await ProductServices.getCategories()
    .then((res) => {
      dispatch(getCategoryAction(res.result.data));
    })
    .catch((rej) => {
      console.log(rej);
    });
};
