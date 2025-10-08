import * as userService from "../services/userService.ts";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  try {
    const input = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    const response = await userService.register(input);
    res.send(response);
  } catch (err) {
    throw err;
  }
}
export async function authenticate(req: Request, res: Response) {
  try {
    const input = {
      username: req.body.username,
      password: req.body.password,
    };
    const response = await userService.authenticate(input);
    res.send(response);
  } catch (err) {
    res.status(502).json({ "message": err.message });
  }
}
