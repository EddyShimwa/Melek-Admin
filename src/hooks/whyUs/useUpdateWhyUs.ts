import { useMutation } from "@tanstack/react-query";
import { IWhyUs } from "../../entities/WhyUs";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { WhyUsSchemaType } from "../../validations/whyus";

const useUpdateWhyUs = (id?: string) => {
	const apiClient = new APIClient<IWhyUs, WhyUsSchemaType>(`/why-us/${id}`);
	return useMutation({
		mutationFn: (data: WhyUsSchemaType) => apiClient.update(data),
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

export default useUpdateWhyUs;
