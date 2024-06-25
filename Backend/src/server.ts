import express from "express";
import { getSuggestionsByUserMood } from "./services/suggestions.service";
import { getUserLastDaysEventsAndMoods } from "./services/events,service";
import { PrismaClient } from '@prisma/client'
import { prisma } from './prisma/prismaClient';

const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/lastDays", async (req, res) => {
  const lastDays = await getUserLastDaysEventsAndMoods(prisma, 1,3);

  console.log(lastDays)
  res.send(JSON.stringify(lastDays));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
