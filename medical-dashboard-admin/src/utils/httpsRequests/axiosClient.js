import axios from "axios";
import store from "../../app/store";
import { API_URL } from "../constants/Config";

const axiosClient = (() => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  instance.interceptors.request.use((config) => {
    const { token } = store.getState().auth;
    if (token) {
      config.headers.Accept = "*/*";
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ContentType =
        "application/json; charset=UTF-8; multipart/form-data";
    }
    return config;
  });
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (rej) => {
      return rej;
    }
  );
  return instance;
})();
export default axiosClient;
