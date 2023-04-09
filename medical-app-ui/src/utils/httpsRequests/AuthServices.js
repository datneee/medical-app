import { UserAuth, paths } from "../../utils/constants/common";
import axiosClient from "./axiosClient";

const AuthServices = {
  signIn: (username, password) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(paths.LOGIN, { username, password })
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  signUp: (body) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(paths.REGISTRATION, body)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  resetPassword: (email) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(paths.RESET_PASSWORD, { email })
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  getCartItem: (id) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(`${paths.GET_CART}/${id}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  addItemToCart: (userId, productId, amount) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(paths.ADD_TO_CART, { userId, productId, amount })
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  deleteCartItem: (id, userId) =>
    new Promise((resolve, reject) => {
      axiosClient
        .delete(`${paths.GET_CARTITEM}?id=${id}&userId=${userId}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  updateQuantityCartItem: (id, amount) =>
    new Promise((resolve, reject) => {
      axiosClient
        .put(`${paths.GET_CARTITEM}/${id}/${amount}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  buyCart: (userId) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(`${paths.BUY_CART}/${userId}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  buyProductOnly: (userId, productId, amount) =>
    new Promise((resolve, reject) => {
      axiosClient
        .post(paths.BUY_PRODUCT, { userId, productId, amount })
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
  getOrderItem: (id) =>
    new Promise((resolve, reject) => {
      axiosClient
        .get(`${paths.GET_ORDER}/${id}`)
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    }),
};
export default AuthServices;
