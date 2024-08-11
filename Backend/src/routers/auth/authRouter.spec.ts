import { describe, expect, it } from "vitest";
import { Configuration } from "../../config/Configuration";
import { testAxios } from "../../testUtils/axiosInstance";
import { StatusCodes } from "http-status-codes";
import { Chance } from "chance";
import { AxiosRequestConfig } from "axios";
import { send } from "process";

const { PORT } = Configuration.getInstance();

let accessToken: string, refreshToken: string;

const registerUser = async (body: Record<string, unknown>) => {
  const res = await testAxios.post(
    `http://localhost:${PORT}/auth/register`,
    body
  );

  return {
    status: res.status,
    data: res.data,
  };
};

const loginUser = async (body: Record<string, unknown>) => {
  const res = await testAxios.post(`http://localhost:${PORT}/auth/login`, body);

  return {
    status: res.status,
    data: res.data,
  };
};

const logoutUser = async (headers: AxiosRequestConfig["headers"]) => {
  const res = await testAxios.get(`http://localhost:${PORT}/auth/logout`, {
    headers,
  });

  return {
    status: res.status,
    data: res.data,
  };
};

const refreshUserToken = async (headers: AxiosRequestConfig["headers"]) => {
  const res = await testAxios.get(`http://localhost:${PORT}/auth/refresh`, {
    headers,
  });

  return {
    status: res.status,
    data: res.data,
  };
};

const sendEventsRequests = async (auth?: string) => {
  const config = {
    ...(auth
      ? {
          headers: {
            Authorization: "Bearer " + auth,
          },
        }
      : {}),
  };

  const res = await testAxios.get(
    `http://localhost:${PORT}/events?date=1`,
    config
  );

  return {
    status: res.status,
    data: res.data,
  };
};

const chance = new Chance();

const user = {
  email: chance.email(),
  gender: chance.pickone(["male", "female", "other"]),
  birthdate: new Date(),
  firstName: chance.word(),
  lastName: chance.word(),
  password: chance.word(),
};

describe("Auth tests", () => {
  it("Test register", async () => {
    const { status } = await registerUser(user);
    expect(status).toBe(StatusCodes.CREATED);
  });

  it("Test register with an existing email", async () => {
    const { status } = await registerUser(user);
    expect(status).toBe(StatusCodes.CONFLICT);
  });

  it("Test register without password", async () => {
    const { password, ...userWithoutPassword } = user;
    const { status } = await registerUser(userWithoutPassword);
    expect(status).toBe(StatusCodes.BAD_REQUEST);
  });

  it("Test login", async () => {
    const response = await loginUser({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(StatusCodes.OK);
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it("Test logout", async () => {
    const response = await logoutUser({
      Authorization: "Bearer " + refreshToken,
    });

    expect(response.status).toBe(StatusCodes.OK);
  });

  it("Test forbidden access without token", async () => {
    const response = await sendEventsRequests();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it("Test access with valid token", async () => {
    const response = await sendEventsRequests(accessToken);
    expect(response.status).toBe(StatusCodes.OK);
  });

  it("Test access with invalid token", async () => {
    const response = await sendEventsRequests("blabla");

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it(
    "Test access after timeout of token",
    {
      timeout: 2000,
    },
    async () => {
      await new Promise((resolve) => setTimeout(() => resolve("done"), 1800));

      const response = await sendEventsRequests(accessToken);
      expect(response.status).not.toBe(StatusCodes.OK);
    }
  );

  it("Test logout when the user wasn't logged in", async () => {
    const response = await logoutUser({
      Authorization: "Bearer " + refreshToken,
    });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it("Test logout when the user wasn't logged in", async () => {
    const response = await logoutUser({
      Authorization: "Bearer " + refreshToken,
    });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it("Test refresh token", async () => {
    const loginResponse = await loginUser({
      password: user.password,
      email: user.email,
    });
    refreshToken = loginResponse.data.refreshToken;

    const response = await refreshUserToken({
      Authorization: "Bearer " + refreshToken,
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    refreshToken = response.data.refreshToken;
  });

  it("Test double use of refresh token", async () => {
    const response = await refreshUserToken({
      Authorization: "Bearer " + refreshToken,
    });

    expect(response.status).toBe(StatusCodes.OK);

    // verify that the new token is valid as well
    const response1 = await await refreshUserToken({
      Authorization: "Bearer " + response.data.refreshToken,
    });
    expect(response1.status).toBe(StatusCodes.OK);

    refreshToken = response1.data.refreshToken;
  });

  it("Test double use of the same refresh token", async () => {
    const response = await refreshUserToken({
      Authorization: "Bearer " + refreshToken,
    });
    expect(response.status).toBe(StatusCodes.OK);

    // verify that the same token is invalid
    const response1 = await refreshUserToken({
      Authorization: "Bearer " + refreshToken,
    });
    expect(response1.status).not.toBe(StatusCodes.OK);
  });
});
