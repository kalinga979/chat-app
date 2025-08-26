import { User } from "../models/userModel.ts";
import bcrypt from "bcrypt";
const salt = 10;
export async function register(
  input: { name: string; username: string; password: string },
) {
  try {
    input.password = await bcrypt.hashSync(input.password, salt);
    const newUser = new User(input);
    const response = await newUser.createUser();
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
