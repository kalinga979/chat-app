import Router from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.ts";

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
