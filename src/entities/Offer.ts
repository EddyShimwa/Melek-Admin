export interface OfferContent {
	id: string;
	title: string;
	content: string;
	offerId: string;
}

export interface IOffer {
	id: string;
	title: string;
	contents: OfferContent[];
}
export interface IAddOffer {
	id: string;
	title: string;
}

export default interface IOfferResponse {
	offers: IOffer[];
	total: number;
	current_page: number;
	hasNextPage: boolean;
	total_pages: number;
}
