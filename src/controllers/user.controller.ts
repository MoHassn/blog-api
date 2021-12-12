import { Request, Response } from "express";
import { User, UserInput } from "../models/user.model";
import { generateJWT, generateHash, comparePassword } from "../helpers/auth";

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

  try {
    const hash = await generateHash(password);

    const newUser: UserInput = {
      name,
      jobTitle,
      email,
      password: hash,
    };

    const userCreated = await User.create(newUser);
    const token = generateJWT({
      name: userCreated.name,
      jobTitle: userCreated.jobTitle,
      id: userCreated.id,
    });

    return res.status(201).send({ token });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send("Error occurred while creating user");
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is Required" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is Required" });
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(400)
        .send({ message: "Email or password is not correct" });
    }

    if (!(await comparePassword(password, user.password))) {
      return res
        .status(400)
        .send({ message: "Email or password is not correct" });
    }
    const token = generateJWT({
      name: user.name,
      jobTitle: user.jobTitle,
      id: user.id,
    });
    return res.status(200).send({ token });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Error occurred while checking user" });
  }
};

export { createUser, login };
