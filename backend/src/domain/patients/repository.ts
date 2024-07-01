import type { CreatePatientDTO } from "../../interfaces/http/validation/create-patient.schema";
import type { ListPacientsQuery } from "../../interfaces/http/validation/list-patients.schema";
import type { PaginatedResponse } from "../../interfaces/pagination.interface";
import type { Patient } from "./entity";

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
