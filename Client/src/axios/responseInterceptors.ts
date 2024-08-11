import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  isAxiosError,
} from "axios";
import { REFRESH_ENDPOINT, refreshToken } from "./tokenRefresher";
import { backendAxiosInstance } from "./backendInstance";
import { redirect } from "react-router-dom";

export const getErrorInterceptor = () => {
  let tokenRefresher: Promise<void> | undefined = undefined;

  return async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_ENDPOINT
    ) {
      originalRequest._retry = true;

      if (!tokenRefresher) {
        tokenRefresher = refreshToken();
      }

      try {
        await tokenRefresher;
        const result: AxiosResponse = await backendAxiosInstance(
          originalRequest
        );

        tokenRefresher = undefined;

        return result;
      } catch (e) {
        if (isAxiosError(e) && e.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");

          redirect("/login");
        }
      }
    }

    throw error;
  };
};
