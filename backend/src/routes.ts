import { Router } from "express";
import { UserController } from "./controller";
import { validateRequest } from "./middlewares/validation.middleware";
import { createUserSchema } from "./schemas/user.schema";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";

export const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
	"/user",
	validateRequest(createUserSchema),
	userController.create.bind(userController),
);
