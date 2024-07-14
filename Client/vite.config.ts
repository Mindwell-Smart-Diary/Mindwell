import dotenv from "dotenv";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "contexts",
        replacement: fileURLToPath(new URL("./src/contexts", import.meta.url)),
      },
      {
        find: "components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
    ],
  },
});