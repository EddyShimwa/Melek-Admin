import { z } from "zod";

export const OfferContentSchema = z.object({
	title: z.string().min(2, "Title should be a least 2 character long!"),
	content: z.string().min(2, "Description should be a least 2 character long!"),
});

export type OfferContentSchemaType = z.infer<typeof OfferContentSchema>;
