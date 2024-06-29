import { Router } from "express";
import { container } from "tsyringe";
import type { UserController } from "./controller/user.controller";
import { validateRequest } from "./middlewares/validation.middleware";
import { loginSchema } from "./schemas/login.schema";
import { createUserSchema } from "./schemas/create-user.schema";
import { InjectionTokens } from "./utils/injection-tokens";
import { createPatientSchema } from "./schemas/create-patient.schema";
import type { PatientController } from "./controller/patient.controller";

export const router = Router();
const userController = container.resolve<UserController>(
	InjectionTokens.USER_CONTROLLER,
);
const patientController = container.resolve<PatientController>(
	InjectionTokens.PATIENT_CONTROLLER,
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

router.post(
	"/patient",
	validateRequest(createPatientSchema),
	patientController.create.bind(patientController),
);
