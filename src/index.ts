require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { connectToDB } from "./dbConnection";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express With Typescript");
});

app.listen(port, async () => {
  await connectToDB();

  console.log(`app is listening on http://localhost:${port}`);
});
