import { container } from "tsyringe";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { InjectionTokens } from "./utils/injection-tokens";
import { PatientController } from "./controller/patient.controller";
import { PatientService } from "./services/patient.service";
import { PatientRepository } from "./repositories/patient.repository";

container.register<UserRepository>(InjectionTokens.USER_REPOSITORY, {
	useClass: UserRepository,
});
container.register<UserService>(InjectionTokens.USER_SERVICE, {
	useClass: UserService,
});
container.register<UserController>(InjectionTokens.USER_CONTROLLER, {
	useClass: UserController,
});

container.register<PatientController>(InjectionTokens.PATIENT_CONTROLLER, {
	useClass: PatientController,
});
container.register<PatientService>(InjectionTokens.PATIENT_SERVICE, {
	useClass: PatientService,
});
container.register<PatientRepository>(InjectionTokens.PATIENT_REPOSITORY, {
	useClass: PatientRepository,
});
