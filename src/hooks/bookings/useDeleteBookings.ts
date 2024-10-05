import { useMutation } from "@tanstack/react-query";
import { IBook } from "../../entities/bookings";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useDeleteBookings = (id?: string) => {
	const apiClient = new APIClient<IBook>(`/bookings/${id}`);
	return useMutation({
		mutationFn: apiClient.delete,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});
};

export default useDeleteBookings;
