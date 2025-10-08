import { User } from "../models/userModel.ts";
import bcrypt from "bcrypt";
// import * as jwtUtils from "../helpers/jwtUtils.ts";
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

export async function authenticate(
  input: { username: string; password: string },
) {
  try {
    const userDetails = new User({ username: input.username });
    const userExists = await userDetails.getUser();
    if (userExists == null) return { message: "User not found." };
    const checkPassword = await bcrypt.compareSync(
      input.password,
      userDetails.password,
    );
    if (checkPassword == true) {
      // const token = jwtUtils.signToken(userExists);
      // const decode = jwtUtils.verifyToken(token);
      // console.log("Verified Token:", decode);
      // console.log("Token generated:", token);
      return userExists;
    }
    return { message: "Invalid Password!" };
  } catch (err) {
    throw err;
  }
}
