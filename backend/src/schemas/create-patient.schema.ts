import { z } from "zod";

export const createPatientSchema = z.object({
	body: z.object({
		name: z.string(),
		document: z.string(),
		email: z.string().email(),
		phone: z.string(),
		birthDate: z
			.string()
			.date()
			.transform((value) => new Date(value)),
		gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
		healthInsuranceId: z.string(),
	}),
});

export type CreatePatientDTO = z.infer<typeof createPatientSchema>["body"];
