import { container } from "tsyringe";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { InjectionTokens } from "./utils/injection-tokens";

container.register<UserRepository>(InjectionTokens.USER_REPOSITORY, {
	useClass: UserRepository,
});
container.register<UserService>(InjectionTokens.USER_SERVICE, {
	useClass: UserService,
});
container.register<UserController>(InjectionTokens.USER_CONTROLLER, {
	useClass: UserController,
});
