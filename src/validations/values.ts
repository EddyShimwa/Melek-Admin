import { z } from "zod";

export const ValueSchema = z.object({
	title: z.string().min(2, "Title should be a least 2 character long!"),
	description: z
		.string()
		.min(2, "Description should be a least 2 character long!"),
});

export type ValueSchemaType = z.infer<typeof ValueSchema>;
