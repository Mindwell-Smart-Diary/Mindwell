/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globalSetup: ["./vitest-api-global-setup.ts"],

    setupFiles: ["./vitest-api-setup.ts"],
    include: ["**/*.spec.?(c|m)[jt]s?(x)"],
  },
});
