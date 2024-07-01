import { container } from "tsyringe";
import { PatientService } from "./application/services/patient.service";
import { UserService } from "./application/services/user.service";
import { EncryptionProvider } from "./infrastructure/bcrypt/bcrypt.provider";
import { TokenProvider } from "./infrastructure/jwt/token.provider";
import { PatientRepository } from "./infrastructure/mongodb/repositories/patient.repository";
import { UserRepository } from "./infrastructure/mongodb/repositories/user.repository";
import { InjectionTokens } from "./injection-tokens";
import { PatientController } from "./interfaces/http/express/controllers/patient.controller";
import { UserController } from "./interfaces/http/express/controllers/user.controller";

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

container.register(InjectionTokens.TOKEN_PROVIDER, {
	useClass: TokenProvider,
});
container.register(InjectionTokens.ENCRYPTION_PROVIDER, {
	useClass: EncryptionProvider,
});
