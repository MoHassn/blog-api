require("dotenv").config();
import mongoose from "mongoose";

const dbURL = process.env.DB_HOST as string;

const connectToDB = async (): Promise<void> => {
  await mongoose.connect(dbURL);
};

export { connectToDB };
