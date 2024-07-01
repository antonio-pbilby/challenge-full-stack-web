import { Router } from "express";
import { container } from "tsyringe";
import type { PatientController } from "./controller/patient.controller";
import type { UserController } from "./controller/user.controller";
import { authenticate } from "./middlewares/authenticate.middleware";
import { validateRequest } from "./middlewares/validation.middleware";
import { createPatientSchema } from "./schemas/create-patient.schema";
import { createUserSchema } from "./schemas/create-user.schema";
import { deletePatientSchema } from "./schemas/delete-patient.schema";
import { listPacientsSchema } from "./schemas/list-patients.schema";
import { loginSchema } from "./schemas/login.schema";
import { InjectionTokens } from "./utils/injection-tokens";

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
	authenticate,
	validateRequest(createPatientSchema),
	patientController.create.bind(patientController),
);

router.get(
	"/patients",
	authenticate,
	validateRequest(listPacientsSchema),
	patientController.list.bind(patientController),
);

router.delete(
	"/patients/:id",
	authenticate,
	validateRequest(deletePatientSchema),
	patientController.delete.bind(patientController),
);
