import { Router } from "express";
import { container } from "tsyringe";
import type { UserController } from "./controller/user.controller";
import { validateRequest } from "./middlewares/validation.middleware";
import { loginSchema } from "./schemas/login.schema";
import { createUserSchema } from "./schemas/user.schema";
import { InjectionTokens } from "./utils/injection-tokens";

export const router = Router();
const userController = container.resolve<UserController>(
	InjectionTokens.USER_CONTROLLER,
);

router.post(
	"/user",
	validateRequest(createUserSchema),
	userController.create.bind(userController),
);

router.post(
	"/login",
	validateRequest(loginSchema),
	userController.login.bind(userController),
);
