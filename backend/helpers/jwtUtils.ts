import jwt from "jsonwebtoken";

import process from "node:process";
const SECRET_KEY = process.env.SECRET_KEY || "your_fallback_secret";

export function signToken(data: object, key: string = SECRET_KEY) {
  try {
    if (!(typeof data == "object")) {
      throw new Error("Invalid Data Type");
    }
    const token = jwt.sign(data, key, { expiresIn: "1h" });
    return token;
  } catch (err) {
    throw err;
  }
}

export function verifyToken(token: string, key: string = SECRET_KEY) {
  try {
    const decodedToken = jwt.verify(token, key);
    return decodedToken;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
