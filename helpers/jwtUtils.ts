import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";
import process from "node:process";
const SECRET_KEY = process.env.SECRET_KEY || "your_fallback_secret";

export function signToken(data: object, key: string = SECRET_KEY) {
  try {
    if (!(typeof data == "object")) {
      throw new Error("Invalid Data Type");
    }
    const token = jwt.sign(data, key, { expiresIn: "1h" });
    console.log(token);
    return token;
  } catch (err) {
    throw err;
  }
}

export function verifyToken(_req: Request, _res: Response, next: NextFunction) {
  next();
}
