export interface IBook {
	id: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
}

export default interface IBookingResponse {
	bookings: IBook[];
	total: number;
	current_page: number;
	hasNextPage: boolean;
	total_pages: number;
}
