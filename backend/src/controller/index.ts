import type { NextFunction, Request, Response } from "express";
import type { UserService } from "../services/user.service";
import { config } from "../config";

export class UserController {
	constructor(private userService: UserService) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const userData = req.body;
			await this.userService.create(userData);
			return res.status(201).send();
		} catch (err) {
			next(err);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const token = await this.userService.login(email, password);

			return res
				.cookie("token", token, {
					httpOnly: true,
					domain: config.COOKIE_DOMAIN,
				})
				.end();
		} catch (err) {
			next(err);
		}
	}
}
