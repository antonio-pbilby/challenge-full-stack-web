import type { Patient } from "../entities/patient.entity";
import { PatientModel } from "../models/patient.model";

export class PatientRepository {
	async create(patient: Patient) {
		const newPatient = new PatientModel(patient);
		await newPatient.save();
		return;
	}
}
