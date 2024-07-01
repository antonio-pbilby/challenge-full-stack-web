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
	createdAt: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: String,
		required: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	updatedBy: {
		type: String,
		required: true,
	},
	deletedAt: {
		type: Date,
		default: null,
	},
	deletedBy: {
		type: String,
		default: null,
	},
});

export const PatientModel = model("Patient", patientSchema);
