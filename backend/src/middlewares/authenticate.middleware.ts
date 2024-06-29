import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { container } from "tsyringe";
import { InjectionTokens } from "../utils/injection-tokens";
import type { UserService } from "../services/user.service";

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userService = container.resolve<UserService>(
			InjectionTokens.USER_SERVICE,
		);
		const token = req?.cookies?.token;

		if (!token) {
			throw new UnauthorizedException([
				{ error: "Missing authentication token" },
			]);
		}

		const user = await userService.authenticate(token);
		Object.assign(req, { user });
		next();
	} catch (err) {
		next(err);
	}
};
