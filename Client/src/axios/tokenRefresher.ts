import axios from "axios";

export const REFRESH_ENDPOINT = "api/auth/refresh";

export const refreshToken = async (): Promise<void> => {
  const res = await axios.get(REFRESH_ENDPOINT, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("refreshToken"),
    },
  })

  const { accessToken, refreshToken } = res.data

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};
