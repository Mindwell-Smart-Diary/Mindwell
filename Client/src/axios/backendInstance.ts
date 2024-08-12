import axios from "axios";
import { getErrorInterceptor } from "./responseInterceptors";

export const backendAxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

backendAxiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    //   "accessToken"
    // )}`;

    config.headers["Authorization"] = `Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzIzNDgyMzU3LCJleHAiOjE3MjM1ODIzNTd9.VEftwVppTTCuXm1h_aNdk2AQaVly7fwRkV1sabDH8Wo`;

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
