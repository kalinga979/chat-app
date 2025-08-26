import Router from "express";
const router = Router();

import * as userController from "../controllers/userController.ts";

router.get("/register", userController.register);

export default router;
