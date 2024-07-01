import { inject, singleton } from "tsyringe";
import { config } from "../../config";
import type { EncryptionProvider } from "../../infrastructure/bcrypt/bcrypt.provider";
import type { TokenProvider } from "../../infrastructure/jwt/token.provider";
import type { UserRepository } from "../../infrastructure/mongodb/repositories/user.repository";
import { InjectionTokens } from "../../injection-tokens";
import type { CreateUserDTO } from "../../interfaces/http/validation/create-user.schema";
import { AppException } from "../exceptions/app.exception";
import { LoginException } from "../exceptions/login.exception";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

@singleton()
export class UserService {
	constructor(
		@inject(InjectionTokens.USER_REPOSITORY)
		private userRepository: UserRepository,

		@inject(InjectionTokens.TOKEN_PROVIDER)
		private tokenProvider: TokenProvider,

		@inject(InjectionTokens.ENCRYPTION_PROVIDER)
		private encryptionProvider: EncryptionProvider,
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

		const encryptedPassword = await this.encryptionProvider.encrypt(
			user.password,
		);

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

		const passwordsMatch = await this.encryptionProvider.compare(
			password,
			user.password,
		);
		if (!passwordsMatch) {
			throw new LoginException();
		}

		const token = this.tokenProvider.sign(
			{
				name: user.name,
				email: user.email,
			},
			config.APP_SECRET,
		);

		return token;
	}

	async authenticate(token: string) {
		try {
			const data = this.tokenProvider.verify(token, config.APP_SECRET);
			return data;
		} catch (err) {
			throw new UnauthorizedException([{ error: "Invalid token" }]);
		}
	}
}
