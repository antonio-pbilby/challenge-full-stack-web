import { inject, singleton } from "tsyringe";
import type { CreatePatientDTO } from "../schemas/create-patient.schema";
import type { PatientRepository } from "../repositories/patient.repository";
import { InjectionTokens } from "../utils/injection-tokens";
import type { ListPacientsQuery } from "../schemas/list-patients.schema";

@singleton()
export class PatientService {
	constructor(
		@inject(InjectionTokens.PATIENT_REPOSITORY)
		private patientRepository: PatientRepository,
	) {}

	async create(patient: CreatePatientDTO, auditUser: string) {
		await this.patientRepository.create(patient, auditUser);
	}

	async list(pagination: ListPacientsQuery) {
		return this.patientRepository.list(pagination);
	}
}
