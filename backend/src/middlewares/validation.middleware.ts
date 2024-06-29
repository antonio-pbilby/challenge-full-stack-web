import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				headers: req.headers,
				params: req.params,
			});
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				res.status(400).json(err.errors);
			}
		}
	};
};
