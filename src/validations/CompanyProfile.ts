import { z } from "zod";

export const CompanyProfileSchema = z.object({
	company_name: z
		.string()
		.min(2, "Company name should be at least 2 characters long!"),
	about: z
		.string()
		.min(10, "About section should be at least 10 characters long!"),
	story_description: z
		.string()
		.min(10, "Story description should be at least 10 characters long!"),
	why_statement: z
		.string()
		.min(10, "Why statement should be at least 10 characters long!"),
	video: z.any().optional(),
	story_image: z.any().optional(),
	why_us_image: z.any().optional(),
	phone_number: z
		.string()
		.regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits!"),
	email: z.string().email("Please enter a valid email address!"),
});

export type CompanyProfileSchemaType = z.infer<typeof CompanyProfileSchema>;
