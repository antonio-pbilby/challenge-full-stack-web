import { Router } from "express";
import { container } from "tsyringe";
import { InjectionTokens } from "../../../injection-tokens";
import { createPatientSchema } from "../validation/create-patient.schema";
import { createUserSchema } from "../validation/create-user.schema";
import { deletePatientSchema } from "../validation/delete-patient.schema";
import { listPacientsSchema } from "../validation/list-patients.schema";
import { loginSchema } from "../validation/login.schema";
import type { PatientController } from "./controllers/patient.controller";
import type { UserController } from "./controllers/user.controller";
import { authenticate } from "./middlewares/authenticate.middleware";
import { validateRequest } from "./middlewares/validation.middleware";

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
