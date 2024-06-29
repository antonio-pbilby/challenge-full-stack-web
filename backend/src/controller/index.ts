import type { Request, Response } from "express";
import type { UserService } from "../services/user.service";

export class UserController {
	constructor(private userService: UserService) {}

	async create(req: Request, res: Response) {
		const userData = req.body;
		await this.userService.create(userData);
		return res.status(201).send();
	}
}
