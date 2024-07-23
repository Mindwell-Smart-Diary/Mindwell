import express from "express";
import { Server } from "http";
import { Configuration } from "./config/Configuration";
import { buildSuggestionRouter } from "./routers/suggestions/suggestionRouter";
import { errorHandler } from "./middleware/errorMiddleware";
import bodyParser from "body-parser";
import { buildEventsRouter } from "./routers/moods/moodsRouter";

export const initServer = () => {
  const { PORT } = Configuration.getInstance();

  const app = express();
  app.use(bodyParser.json());
  app.use(buildSuggestionRouter());
  app.use(buildEventsRouter());

  app.use(errorHandler);

  const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return (): Promise<void> => {
    return new Promise((resolve: () => void) => {
      server.close(() => resolve());
    });
  };
};
