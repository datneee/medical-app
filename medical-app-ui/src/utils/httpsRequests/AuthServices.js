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
};
export default AuthServices;
