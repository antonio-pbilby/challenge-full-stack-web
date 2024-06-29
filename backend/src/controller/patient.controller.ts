import type { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import type { PatientService } from "../services/patient.service";
import { InjectionTokens } from "../utils/injection-tokens";

@singleton()
export class PatientController {
	constructor(
		@inject(InjectionTokens.PATIENT_SERVICE)
		private patientService: PatientService,
	) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const patientData = req.body;
			await this.patientService.create(patientData);

			return res.status(201).send();
		} catch (err) {
			next(err);
		}
	}
}
