import { paths } from "../../utils/constants/common";
import axiosClient from "./axiosClient";

const ProductServices = {
  getAll: (
    page = 1,
    perPage = 10,
    inCategory,
    searchValue,
    debouncedMinValue,
    debouncedMaxValue
  ) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(
          `${paths.PRODUCTS}?page=${page}&perPage=${perPage}&categoryId=${
            inCategory ? inCategory : ""
          }&search=${searchValue ? searchValue : ""}&mnOPrice=${
            debouncedMinValue ? debouncedMinValue : ""
          }&mxOPrice=${debouncedMaxValue ? debouncedMaxValue : ""}`
        )
        .then((res) => {
          resolve(res.result);
        })
        .catch((rej) => reject(rej));
    }),
  getProductById: (id) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(`${paths.PRODUCTS}/${id}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  getProductFeatured: () => 
    new Promise((resolve, reject) => {
      axiosClient
        .get(paths.GET_PRODUCT_FEATURED)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej))
    }),
  getCategories: () =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(paths.CATEGORIES)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  getProductByCategoryId: (id) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(`${paths.GET_PRODUCTS_BY_CATEGORY_ID}?id=${id}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  getBrand: () =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(paths.BRANDS)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
};
export default ProductServices;
