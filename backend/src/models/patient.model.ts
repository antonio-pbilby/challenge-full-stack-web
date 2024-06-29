import { Schema, model } from "mongoose";

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
		required: true,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	healthInsuranceId: {
		type: String,
		required: true,
	},
});

export const PatientModel = model("Patient", patientSchema);
