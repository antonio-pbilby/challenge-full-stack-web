import { Router } from "express";
import { UserController } from "./controller";

export const router = Router();
const userController = new UserController();

router.post("/user", userController.create);
