import { configDotenv } from "dotenv";
import { afterAll, beforeAll } from "vitest";
import { initServer } from "./src/server";
import { testAxios } from "./src/testUtils/axiosInstance";
import { Configuration } from "./src/config/Configuration";

let killServer: () => Promise<void>;

export const LOGGED_IN_USER_ID = 0;

beforeAll(async () => {
  const { PORT } = Configuration.getInstance();

  configDotenv({
    path: "./.env.test",
  });

  killServer = await initServer();

  const res = await testAxios.post(`http://localhost:${PORT}/auth/login`, {
    email: "john.doe@example.com",
    password: "password123",
  });

  process.env.TESTS_ACCESS_TOKEN = res.data.accessToken;
});

afterAll(async () => {
  console.log("killing server");
  await killServer();
});
