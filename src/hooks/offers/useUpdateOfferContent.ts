import { useMutation } from "@tanstack/react-query";
import { OfferContent } from "../../entities/Offer";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { OfferContentData } from "./useAddOfferContent";

const useUpdateOfferContent = (id?: string) => {
	const apiClient = new APIClient<OfferContent, OfferContentData>(
		`/offer-contents/${id}`,
	);
	return useMutation({
		mutationFn: (data: OfferContentData) => apiClient.update(data),
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

export default useUpdateOfferContent;
