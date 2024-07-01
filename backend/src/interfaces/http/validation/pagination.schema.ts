import { z } from "zod";

export const paginationSchema = z.object({
	query: z.object({
		page: z.number({ coerce: true }).int().min(1),
		pageSize: z
			.number({ coerce: true })
			.int()
			.min(1)
			.transform((value) => Number(value)),
	}),
});
