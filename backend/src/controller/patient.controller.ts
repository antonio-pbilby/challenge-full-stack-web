import type { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import type { PatientService } from "../services/patient.service";
import { InjectionTokens } from "../utils/injection-tokens";
import type { RequestWithUser } from "../interfaces/request-with-user.interface";

@singleton()
export class PatientController {
	constructor(
		@inject(InjectionTokens.PATIENT_SERVICE)
		private patientService: PatientService,
	) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const patientData = req.body;
			const user = (req as RequestWithUser).user.email;
			await this.patientService.create(patientData, user);

			return res.status(201).send();
		} catch (err) {
			next(err);
		}
	}
}
