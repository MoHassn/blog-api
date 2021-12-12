import mongoose, { Schema, Model, Document } from "mongoose";

type UserInput = {
  name: string;
  jobTitle: string;
  email: string;
  password: string;
};

type UserDocument = Document & {
  name: UserInput["name"];
  jobTitle: UserInput["jobTitle"];
  email: UserInput["email"];
  password: UserInput["password"];
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<UserDocument> = mongoose.model("User", userSchema);

export { User, UserInput, UserDocument };
