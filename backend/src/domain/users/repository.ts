import type { User } from "./entity";

export interface UserRepositoryInterface {
	create(user: User): Promise<void>;
	findByEmail(email: string): Promise<User | undefined>;
}
