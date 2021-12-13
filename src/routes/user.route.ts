import { Router } from "express";

import { getUsers, getUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:userId", getUser);

export { userRouter };
