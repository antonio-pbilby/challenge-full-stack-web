import { z } from "zod";

export const deletePatientSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});
