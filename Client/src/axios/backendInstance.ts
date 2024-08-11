import axios from "axios";
import { getErrorInterceptor } from "./responseInterceptors";

export const backendAxiosInstance = axios.create({
  baseURL: "/api",
});

backendAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendAxiosInstance.interceptors.response.use(
  (response) => response,
  getErrorInterceptor()
);
