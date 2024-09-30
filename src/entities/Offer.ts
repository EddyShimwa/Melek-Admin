export interface OfferContent {
	id: string;
	title: string;
	content: string;
	offerId: string;
}

export default interface IOffer {
	id: string;
	title: string;
	contents: OfferContent[];
}
