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

    config.headers["Authorization"] = `b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzNjY5MDg1LCJleHAiOjE3MjM3MjkwODV9.IH-RRvv1E3khk5nUY_WjxoFNr0T1P-NFGeEFxvfg6aI`;

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
