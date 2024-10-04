import { useMutation } from "@tanstack/react-query";
import { IAddOffer } from "../../entities/Offer";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useDeleteOfferContent = (id?: string) => {
	const apiClient = new APIClient<IAddOffer>(`/offer-contents/${id}`);
	return useMutation({
		mutationFn: apiClient.delete,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["offers"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});
};

export default useDeleteOfferContent;