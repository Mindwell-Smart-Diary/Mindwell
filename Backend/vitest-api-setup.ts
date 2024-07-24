import { configDotenv } from "dotenv";
import { afterAll, beforeAll } from "vitest";
import { initServer } from "./src/server";

let killServer: () => Promise<void>;

beforeAll(() => {
  configDotenv({
    path: "./.env.test",
  });

  killServer = initServer();
});

afterAll(async () => {
  console.log("killing server");
  await killServer();
});
