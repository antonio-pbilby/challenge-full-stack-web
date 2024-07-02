import type { Patient } from "../entities/patient.entity";
import { PaginatedResponse } from "../interfaces/pagination.interface";
import type { CreatePatientDTO } from "../schemas/create-patient.schema";
import type { ListPacientsQuery } from "../schemas/list-patients.schema";

export interface PatientRepositoryInterface {
	create(patient: CreatePatientDTO, auditUser: string): Promise<void>;
	list({
		pageSize,
		page,
		name,
	}: ListPacientsQuery): Promise<PaginatedResponse<Patient>>;
	findById(id: string): Promise<Patient | undefined>;
	find(
		filter: Partial<Pick<Patient, "email" | "document" | "healthInsuranceId">>,
	): Promise<Patient | undefined>;
	delete(id: string, auditUser: string): Promise<void>;
}
