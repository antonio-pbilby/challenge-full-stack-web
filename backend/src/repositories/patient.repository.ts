import type { Patient } from "../entities/patient.entity";
import { PatientModel } from "../models/patient.model";
import type { ListPacientsQuery } from "../schemas/list-patients.schema";
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

	async list({ pageSize = 10, page = 1, name }: ListPacientsQuery) {
		const skip = (page - 1) * pageSize;

		const filter = {
			...(name && { name: { $regex: name } }),
			deletedAt: null,
		};

		const [patients, count] = await Promise.all([
			PatientModel.find(filter).skip(skip).limit(pageSize),
			PatientModel.countDocuments(filter),
		]);

		return createPaginatedResponse(patients, {
			page,
			pageSize,
			totalItems: count,
		});
	}

	async findById(id: string) {
		return PatientModel.findById(id);
	}

	async find(filter: Partial<Pick<Patient, 'email' | 'document' | 'healthInsuranceId'>>) {
		const mongooseFilter = {
			...(filter.document && {document: filter.document}),
			...(filter.email && {email: filter.email}),
			...(filter.healthInsuranceId && {healthInsuranceId: filter.healthInsuranceId}),
		};

		const patient = await PatientModel.findOne(mongooseFilter);

		return patient;
	}

	async delete(id: string, auditUser: string) {
		await PatientModel.findByIdAndUpdate(id, {
			deletedAt: new Date(),
			deletedBy: auditUser,
		});
	}
}
