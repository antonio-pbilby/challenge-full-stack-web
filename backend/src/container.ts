import { container } from "tsyringe";
import { PatientController } from "./controller/patient.controller";
import { UserController } from "./controller/user.controller";
import { PatientRepository } from "./repositories/patient.repository";
import { UserRepository } from "./repositories/user.repository";
import { PatientService } from "./services/patient.service";
import { UserService } from "./services/user.service";
import { InjectionTokens } from "./utils/injection-tokens";

container.register(InjectionTokens.USER_REPOSITORY, {
	useClass: UserRepository,
});
container.register(InjectionTokens.USER_SERVICE, {
	useClass: UserService,
});
container.register(InjectionTokens.USER_CONTROLLER, {
	useClass: UserController,
});

container.register(InjectionTokens.PATIENT_CONTROLLER, {
	useClass: PatientController,
});
container.register(InjectionTokens.PATIENT_SERVICE, {
	useClass: PatientService,
});
container.register(InjectionTokens.PATIENT_REPOSITORY, {
	useClass: PatientRepository,
});
