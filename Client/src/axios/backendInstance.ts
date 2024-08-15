import axios from "axios";
import { getErrorInterceptor } from "./responseInterceptors";

export const backendAxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

backendAxiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    //   "accessToken"
    // )}`;

    config.headers["Authorization"] = `b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNzIzNzQ0NTI1LCJleHAiOjE3MjM4NDQ1MjV9.w3tlRQWMLA1KGcAUgxk-fQGlTQ8_jv2ITPjIj3iQbNc`;

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
