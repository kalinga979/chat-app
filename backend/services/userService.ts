import { User } from "../models/userModel.ts";
import bcrypt from "bcrypt";
import * as jwtUtils from "../helpers/jwtUtils.ts";
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
    throw err;
  }
}

export async function login(
  input: { username: string; password: string },
) {
  try {
    const userDetails = new User({ username: input.username });
    const userExists = await userDetails.getUser();
    if (userExists == null) throw new Error("User not found.");
    const checkPassword = await bcrypt.compareSync(
      input.password,
      userDetails.password,
    );
    if (checkPassword == true) {
      const token = jwtUtils.signToken(userExists);
      return token;
    }
    throw new Error("Invalid Password!");
  } catch (err) {
    throw err;
  }
}
