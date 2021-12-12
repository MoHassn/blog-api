import * as bcrypt from "bcrypt";
import * as JWT from "jsonwebtoken";

const generateHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

interface JWTData {
  name: string;
  jobTitle: string;
  id: string;
}
const generateJWT = (user: JWTData): string => {
  const SECRET = process.env.JWT_SECRET as string;
  const jwt = JWT.sign(user, SECRET);
  return jwt;
};

export { generateHash, comparePassword, generateJWT };
