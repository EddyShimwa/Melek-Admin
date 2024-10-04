import { useMutation } from "@tanstack/react-query";
import { IWhyUs } from "../../entities/WhyUs";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useDeleteWhyUs = (id?: string) => {
	const apiClient = new APIClient<IWhyUs>(`/why-us/${id}`);
	return useMutation({
		mutationFn: apiClient.delete,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["why-us"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});
};

export default useDeleteWhyUs;
