require("dotenv").config();
import express, { Request, Response } from "express";
import { connectToDB } from "./dbConnection";

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express With Typescript");
});

app.listen(port, async () => {
  await connectToDB();

  console.log(`app is listening on http://localhost:${port}`);
});
