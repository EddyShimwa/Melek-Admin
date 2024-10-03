import { z } from "zod";

export const OfferSchema = z.object({
	title: z.string().min(2, "Title should be a least 2 character long!"),
});

export type OfferSchemaType = z.infer<typeof OfferSchema>;
