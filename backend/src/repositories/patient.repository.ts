import type { Patient } from "../entities/patient.entity";
import type { Pagination } from "../interfaces/pagination.interface";
import { PatientModel } from "../models/patient.model";
import { createPaginatedResponse } from "../utils/create-paginated-response";

export class PatientRepository {
	async create(patient: Patient, auditUser: string) {
		const newPatient = new PatientModel({
			...patient,
			createdBy: auditUser,
			updatedBy: auditUser,
		});
		await newPatient.save();
		return;
	}

	async list({ pageSize = 10, page = 1 }: Pagination) {
		const skip = (page - 1) * pageSize;
		const [patients, count] = await Promise.all([
			PatientModel.find({ deletedAt: null }).skip(skip).limit(pageSize),
			PatientModel.countDocuments({ deletedAt: null }),
		]);

		return createPaginatedResponse(patients, {
			page,
			pageSize,
			totalItems: count,
		});
	}
}
