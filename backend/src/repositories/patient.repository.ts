import type { Patient } from "../entities/patient.entity";
import { PaginatedResponse } from "../interfaces/pagination.interface";
import { PatientModel } from "../models/patient.model";
import type { CreatePatientDTO } from "../schemas/create-patient.schema";
import type { ListPacientsQuery } from "../schemas/list-patients.schema";
import {
	createPaginatedResponse,
} from "../utils/create-paginated-response";
import type { PatientRepositoryInterface } from "./patient.repository.interface";

export class PatientRepository implements PatientRepositoryInterface {
	async create(patient: CreatePatientDTO, auditUser: string): Promise<void> {
		const newPatient = new PatientModel({
			...patient,
			createdBy: auditUser,
			updatedBy: auditUser,
		});
		await newPatient.save();
		return;
	}

	async list({
		pageSize = 10,
		page = 1,
		name,
	}: ListPacientsQuery): Promise<PaginatedResponse<Patient>> {
		const skip = (page - 1) * pageSize;

		const filter = {
			...(name && { name: { $regex: name } }),
			deletedAt: null,
		};

		const [patients, count] = await Promise.all([
			PatientModel.find(filter).skip(skip).limit(pageSize),
			PatientModel.countDocuments(filter),
		]);

		const mappedPatients = patients.map((patient) => ({
			...patient.toObject(),
			_id: String(patient.id),
		}));

		return createPaginatedResponse(mappedPatients, {
			page,
			pageSize,
			totalItems: count,
		});
	}

	async findById(id: string): Promise<Patient | undefined> {
		const patient = await PatientModel.findById(id);
		patient?._id;
		return patient?.toObject();
	}

	async find(
		filter: Partial<Pick<Patient, "email" | "document" | "healthInsuranceId">>,
	): Promise<Patient | undefined> {
		const mongooseFilter = {
			...(filter.document && { document: filter.document }),
			...(filter.email && { email: filter.email }),
			...(filter.healthInsuranceId && {
				healthInsuranceId: filter.healthInsuranceId,
			}),
		};

		const patient = await PatientModel.findOne(mongooseFilter);

		return patient?.toObject();
	}

	async delete(id: string, auditUser: string): Promise<void> {
		await PatientModel.findByIdAndUpdate(id, {
			deletedAt: new Date(),
			deletedBy: auditUser,
		});
	}
}
