import type { User } from "../entities/user";
import { AppException } from "../exceptions/app.exception";
import type { UserRepository } from "../repositories/user.repository";

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async create(user: User) {
		const existsUserWithEmail = await this.userRepository.findByEmail(
			user.email,
		);

		if (existsUserWithEmail) {
			throw new AppException(400, "A user already exists with this email");
		}

		await this.userRepository.create(user);
	}
}
