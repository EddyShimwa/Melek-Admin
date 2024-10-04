export interface IWhyUs {
	id: string;
	title: string;
	description: string;
}

export default interface IWhyUsResponse {
	whyUs: IWhyUs[];
	total: number;
	current_page: number;
	hasNextPage: boolean;
	total_pages: number;
}
