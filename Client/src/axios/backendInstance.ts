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

    config.headers["Authorization"] = `b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzNjUxMzQxLCJleHAiOjE3MjM3NTEzNDF9.jNNXgyKqcEwPJwmRlDjiJ1Qy0MQaVPFkXgo5VbrugvA`;

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
