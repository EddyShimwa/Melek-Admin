import { z } from "zod";

export const WhyUsSchema = z.object({
	title: z.string().min(2, "Title should be a least 2 character long!"),
	description: z
		.string()
		.min(2, "Description should be a least 2 character long!"),
});

export type WhyUsSchemaType = z.infer<typeof WhyUsSchema>;
