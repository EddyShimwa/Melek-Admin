import { useQuery } from "@tanstack/react-query";
import IBookingResponse from "../../entities/bookings";
import { PaginationParams } from "../../entities/PaginateParams";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<IBookingResponse>("/bookings");

const useBookings = (querry?: PaginationParams) =>
	useQuery({
		queryKey: ["bookings", querry],
		queryFn: () =>
			apiClient.fetch({
				params: {
					pageNumber: querry?.pageNumber,
					take: querry?.take,
					search: querry?.search,
				},
			}),
	});

export default useBookings;
