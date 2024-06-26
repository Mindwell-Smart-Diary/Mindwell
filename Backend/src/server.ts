import express from "express";
import { getSuggestionsByUserMood } from "./services/suggestions.service";
import { getUserLastDaysEventsAndMoods } from "./services/events,service";
import { prisma } from './prisma/prismaClient';
import { Mood } from "./models/enums/mood.enum";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

// Just for checking the functions
app.get("/history", async (req, res) => {
  const suggestions = await getSuggestionsByUserMood(prisma,1, Mood.Happy)
  const lastDays = await getUserLastDaysEventsAndMoods(prisma, 1,3);

  console.log(suggestions);
  console.log(lastDays);
  res.send("");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
