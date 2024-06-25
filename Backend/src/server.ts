import express from "express";
import { getUserHistory } from "./services/history";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/history", (req, res) => {
  
  res.send(JSON.stringify(getUserHistory(1,"Happy")));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
