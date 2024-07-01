import express from "express";
import { Server } from "http";
import { Configuration } from "./config/Configuration";

export const initServer = () => {
  const { PORT } = Configuration.getInstance();

  const app = express();

  app.get("/", async (req, res) => {
    res.send("Hello, Typescript with Express!");
  });

  const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return (): Promise<void> => {
    return new Promise((resolve: () => void) => {
      server.close(() => resolve());
    });
  };
};
