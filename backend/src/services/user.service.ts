import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, singleton } from "tsyringe";
import { config } from "../config";
import { AppException } from "../exceptions/app.exception";
import { LoginException } from "../exceptions/login.exception";
import type { UserRepository } from "../repositories/user.repository";
import { InjectionTokens } from "../utils/injection-tokens";
import type { CreateUserDTO } from "../schemas/user.schema";

@singleton()
export class UserService {
	constructor(
		@inject(InjectionTokens.USER_REPOSITORY)
		private userRepository: UserRepository,
	) {}

	async create(user: CreateUserDTO) {
		const passwordsMatch = user.password === user.confirmPassword;
		if (!passwordsMatch) {
			throw new AppException(400, "Passwords do not match");
		}

		const existsUserWithEmail = await this.userRepository.findByEmail(
			user.email,
		);

		if (existsUserWithEmail) {
			throw new AppException(400, "A user already exists with this email");
		}

		const encryptedPassword = await bcrypt.hash(user.password, 10);

		await this.userRepository.create({
			...user,
			password: encryptedPassword,
		});
	}

	async login(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new LoginException();
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			throw new LoginException();
		}

		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			config.APP_SECRET,
		);

		return token;
	}
}
