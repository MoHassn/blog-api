import { Request, Response } from "express";
import { User, UserInput } from "../models/user.model";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, jobTitle } = req.body;
  if (!name) {
    return res.status(400).send({ message: "Name is Required" });
  }
  if (!email) {
    return res.status(400).send({ message: "Email is Required" });
  }
  if (!jobTitle) {
    return res.status(400).send({ message: "JobTitle is Required" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is Required" });
  }

  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      return res
        .status(400)
        .send({ message: "Email is already used in another account" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Error checking user existence" });
  }

  const newUser: UserInput = {
    name,
    jobTitle,
    email,
    password,
  };

  console.log("user", newUser);
  let userCreated;

  try {
    userCreated = await User.create(newUser);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send("Error occurred while creating user");
  }

  return res.status(201).send({ userCreated });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is Required" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is Required" });
  }
};

export { createUser, login };
