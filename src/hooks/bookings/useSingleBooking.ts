import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { IBook } from "../../entities/bookings";
import APIClient from "../../services/api-client";

const useSingleBookings = (id: string) => {
	const apiClient = new APIClient<IBook>(`/bookings/${id}`);
	return useQuery({
		queryKey: ["bookings", id],
		queryFn: apiClient.fetch,
		staleTime: ms("1 day"),
	});
};

export default useSingleBookings;
