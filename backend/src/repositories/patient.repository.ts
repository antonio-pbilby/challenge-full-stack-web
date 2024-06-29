import type { Patient } from "../entities/patient.entity";
import { PatientModel } from "../models/patient.model";

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
}
