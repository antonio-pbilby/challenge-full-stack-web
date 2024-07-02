import { Patient } from "../../src/entities/patient.entity";
import { PaginatedResponse } from "../../src/interfaces/pagination.interface";
import { PatientRepositoryInterface } from "../../src/repositories/patient.repository.interface";

export class FakePatientRepository implements PatientRepositoryInterface {
	async create(): Promise<void> {
		throw new Error('not implemented');
	}
	
	async list(): Promise<PaginatedResponse<Patient>> {
		throw new Error('not implemented');
	}

	async findById(): Promise<Patient | undefined> {
		throw new Error('not implemented');
	}

	async find(): Promise<Patient | undefined> {
		throw new Error('not implemented');
	}

	async delete(): Promise<void> {
		throw new Error('not implemented');
	}
}