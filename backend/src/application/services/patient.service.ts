import { inject, singleton } from "tsyringe";
import type { PatientRepositoryInterface } from "../../domain/patients/repository";
import { InjectionTokens } from "../../injection-tokens";
import type { CreatePatientDTO } from "../../interfaces/http/validation/create-patient.schema";
import type { ListPacientsQuery } from "../../interfaces/http/validation/list-patients.schema";
import { AppException } from "../exceptions/app.exception";

@singleton()
export class PatientService {
	constructor(
		@inject(InjectionTokens.PATIENT_REPOSITORY)
		private patientRepository: PatientRepositoryInterface,
	) {}

	async create(patient: CreatePatientDTO, auditUser: string) {
		const [existsWithEmail, existsWithDocument, existsWithHealthInsuranceId] =
			await Promise.all([
				this.patientRepository.find({ email: patient.email }),
				this.patientRepository.find({ document: patient.document }),
				this.patientRepository.find({
					healthInsuranceId: patient.healthInsuranceId,
				}),
			]);

		if (existsWithEmail) {
			throw new AppException(400, "A patient already exists with this email");
		}
		if (existsWithDocument) {
			throw new AppException(
				400,
				"A patient already exists with this document",
			);
		}
		if (existsWithHealthInsuranceId) {
			throw new AppException(
				400,
				"A patient already exists with this health insurance id",
			);
		}

		await this.patientRepository.create(patient, auditUser);
	}

	async list(pagination: ListPacientsQuery) {
		return this.patientRepository.list(pagination);
	}

	async delete(id: string, auditUser: string) {
		const patientExists = await this.patientRepository.findById(id);

		if (!patientExists) {
			throw new AppException(400, "Patient does not exist");
		}

		await this.patientRepository.delete(id, auditUser);
	}
}
