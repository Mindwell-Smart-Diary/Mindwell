import express from "express";
import { getSuggestionsByUserMood } from "./services/suggestions.service";
import { getUserLastDaysEventsAndMoods } from "./services/events.service";
import { prisma } from './prisma/prismaClient';
import { Mood } from "./models/enums/mood.enum";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
