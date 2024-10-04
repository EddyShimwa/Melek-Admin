import { z } from "zod";

export const MilestoneSchema = z.object({
	year: z.string().min(2, "Title should be a least 2 character long!"),
	description: z
		.string()
		.min(2, "Description should be a least 2 character long!"),
});

export type MilestoneSchemaType = z.infer<typeof MilestoneSchema>;
