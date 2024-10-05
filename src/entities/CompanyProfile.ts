export default interface ICompanyProfile {
	id: string;
	company_name: string;
	video_url: string;
	about: string;
	story_image_url: string;
	story_description: string;
	why_statement: string;
	why_us_image_url: string;
	phone_number: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	message: string;
	length: number;
}

export interface ICompanyProfileResponse {
	companyProfiles: ICompanyProfile[];
}

export interface CompanyProfileFiles {
	video?: FileList;
	story_image?: FileList;
	why_us_image?: FileList;
}
