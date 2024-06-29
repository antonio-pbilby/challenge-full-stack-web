import { z } from "zod";
import { paginationSchema } from "./pagination.schema";

export const listPacientsSchema = z.object({
	query: paginationSchema.shape.query
		.extend({
			name: z.string().optional(),
		})
		.strict(),
});

export type ListPacientsQuery = z.infer<typeof listPacientsSchema>["query"];
