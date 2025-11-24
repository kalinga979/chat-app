import { verifyToken } from "./jwtUtils.ts";
import type { NextFunction, Request, Response } from "express";
// export async function validateToken(
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const response = await verifyToken(req.cookie.token);
//     if()
//   } catch (err: unknown) {
//     res.status(401).json({ message: err.message });
//     throw err;
//   }
// }
