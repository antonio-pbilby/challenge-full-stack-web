import { Router } from "express";
import { UserController } from "./controller";
import { validateRequest } from "./middlewares/validation.middleware";
import { createUserSchema } from "./schemas/user.schema";

export const router = Router();
const userController = new UserController();

router.post("/user", validateRequest(createUserSchema), userController.create);
