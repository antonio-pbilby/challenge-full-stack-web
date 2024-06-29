import { Schema } from "mongoose";

export const auditUtilSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	deletedAt: {
		type: Date,
		default: null,
	},
	createdBy: {
		type: String,
		required: true,
	},
	updatedBy: {
		type: String,
		required: true,
	},
	deletedBy: {
		type: String,
		default: null,
	},
});
