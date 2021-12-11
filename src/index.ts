import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express With Typescript");
});

app.listen(8000, () => {
  console.log(`app is listening on localhost:8000`);
});
