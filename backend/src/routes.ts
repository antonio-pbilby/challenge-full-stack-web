import { Router } from "express";
import { UserController } from "./controller";
import { validateRequest } from "./middlewares/validation.middleware";
import { createUserSchema } from "./schemas/user.schema";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { loginSchema } from "./schemas/login.schema";

export const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

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
