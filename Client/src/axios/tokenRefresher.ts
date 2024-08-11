import axios from "axios";

export const REFRESH_ENDPOINT = "/api/auth/refresh";

export const refreshToken = async (): Promise<void> => {
  const { accessToken, refreshToken } = (
    await axios.get(REFRESH_ENDPOINT, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("refreshToken"),
      },
    })
  ).data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
