import type { User } from "../entities/user";
import { UserModel } from "../models/user.model";

export class UserRepository {
	async create(user: User) {
		const newUser = new UserModel(user);
		await newUser.save();
	}

	async findByEmail(email: string) {
		const user = UserModel.findOne({
			email,
		});

		return user;
	}
}
