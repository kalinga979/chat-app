import * as userService from "../services/userService.ts";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const input = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    const response = await userService.register(input);
    res.send(response);
  } catch (err: unknown) {
    res.status(422).json({ message: err.message });
    throw err;
  }
}
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const input = {
      username: req.body.username,
      password: req.body.password,
    };
    const token = await userService.login(input);
    res.cookie("token", token, { httpOnly: false });
    res.redirect("/dashboard");
  } catch (err: unknown) {
    console.log(err);
    res.status(401).json({ "message": err.message });
  }
}
