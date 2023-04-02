import { UserAuth, paths } from "../../utils/constants/common";
import axiosClient from "./axiosClient";

const ProductServices = {
  getAll: (page = 1, perPage = 10) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(`${paths.PRODUCTS}?page=${page}&perPage=${perPage}`)
        .then((res) => resolve(res.result))
        .catch((rej) => reject(rej));
    }),
};
export default ProductServices;
