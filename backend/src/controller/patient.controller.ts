import type { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import type { PatientService } from "../services/patient.service";
import { InjectionTokens } from "../utils/injection-tokens";
import type { RequestWithUser } from "../interfaces/request-with-user.interface";
import type { ListPacientsQuery } from "../schemas/list-patients.schema";

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

	async list(req: Request, res: Response, next: NextFunction) {
		try {
			// biome-ignore lint/suspicious/noExplicitAny: <Query is being validate in validation middleware>
			const query = req.query as any as ListPacientsQuery;
			const patients = await this.patientService.list(query);
			return res.status(200).json(patients);
		} catch (err) {
			next(err);
		}
	}
}
