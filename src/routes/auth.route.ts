import { Router } from "express";
import { createUser, login } from "../controllers/user.controller";

const authRouter = Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
