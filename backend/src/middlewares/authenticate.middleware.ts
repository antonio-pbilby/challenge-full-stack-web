import type { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import type { UserService } from "../services/user.service";
import { InjectionTokens } from "../utils/injection-tokens";

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
