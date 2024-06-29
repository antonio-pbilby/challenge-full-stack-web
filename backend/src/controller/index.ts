import type { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export class UserController {
	async create(req: Request, res: Response) {
		const userData = req.body;
		const newUser = new UserModel(userData);
		await newUser.save();
		return res.status(201).send();
	}
}
