import express from "express";
import cors from "cors";
import { Server } from "http";
import { Configuration } from "./config/Configuration";
import { buildSuggestionRouter } from "./routers/suggestions/suggestionRouter";
import { errorHandler } from "./middleware/errorMiddleware";
import bodyParser from "body-parser";
import { buildMoodsRouter } from "./routers/moods/moodsRouter";
import { buildEventsRouter } from "./routers/events/eventsRouter";
import { buildAuthRouter } from "./routers/auth/authRouter";
import { authorizeUser } from "./middleware/auth";
import { buildUsersRouter } from "./routers/users/usersRouter";
import morgan from "morgan";
import { Settings } from "luxon";

export const initServer = () => {
  const { PORT } = Configuration.getInstance();
  Settings.defaultZone = "Asia/Jerusalem";

  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());

  app.use(bodyParser.json());
  app.use("/auth", buildAuthRouter());

  app.use(authorizeUser);

  app.use("/suggestions", buildSuggestionRouter());
  app.use("/moods", buildMoodsRouter());
  app.use("/events", buildEventsRouter());
  app.use("/users", buildUsersRouter());

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
