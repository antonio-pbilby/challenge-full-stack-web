import { z } from "zod";

export const createUserSchema = z.object({
	body: z.object({
		name: z.string(),
		email: z.string().email(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/\d/, "Password must contain at least one number")
			.regex(
				/[^a-zA-Z0-9]/,
				"Password must contain at least one special character",
			),
		confirmPassword: z.string(),
	}),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>["body"];
