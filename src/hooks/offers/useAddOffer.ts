import { useMutation } from "@tanstack/react-query";
import { IAddOffer } from "../../entities/Offer";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError } from "../../utils/toastHandler";
import { OfferSchemaType } from "../../validations/Offer";

const apiClient = new APIClient<IAddOffer, OfferSchemaType>("/offers");

const useAddOffer = () =>
	useMutation({
		mutationFn: (data: OfferSchemaType) => apiClient.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["offers"],
			});
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddOffer;
