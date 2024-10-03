import { useMutation } from "@tanstack/react-query";
import { IAddOffer } from "../../entities/Offer";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { OfferSchemaType } from "../../validations/Offer";

const useUpdateOffer = (id?: string) => {
	const apiClient = new APIClient<IAddOffer, OfferSchemaType>(`/offers/${id}`);
	return useMutation({
		mutationFn: (data: OfferSchemaType) => apiClient.update(data),
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

export default useUpdateOffer;
