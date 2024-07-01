import { Schema, model } from "mongoose";
import { auditUtilSchema } from "./audit.util";

const patientSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	document: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	birthDate: {
		type: Date,
	},
	gender: {
		type: String,
	},
	healthInsuranceId: {
		type: String,
		required: true,
	},
	...auditUtilSchema.obj,
});

export const PatientModel = model("Patient", patientSchema);
