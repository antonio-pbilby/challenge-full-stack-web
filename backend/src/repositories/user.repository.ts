import { injectable } from "tsyringe";
import type { User } from "../entities/user.entity";
import { UserModel } from "../models/user.model";

@injectable()
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
