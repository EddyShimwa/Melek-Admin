import { useMutation } from "@tanstack/react-query";
import { OfferContent } from "../../entities/Offer";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError } from "../../utils/toastHandler";
import { OfferContentSchemaType } from "../../validations/OfferContent";

export interface OfferContentData extends OfferContentSchemaType {
	offerId: string;
}

const apiClient = new APIClient<OfferContent, OfferContentData>(
	"/offer-contents",
);

const useAddOfferContent = () =>
	useMutation({
		mutationFn: (data: OfferContentData) => apiClient.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["offers"],
			});
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddOfferContent;
