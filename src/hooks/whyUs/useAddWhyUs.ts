import { useMutation } from "@tanstack/react-query";
import { IWhyUs } from "../../entities/WhyUs";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError } from "../../utils/toastHandler";
import { WhyUsSchemaType } from "../../validations/whyus";

const apiClient = new APIClient<IWhyUs, WhyUsSchemaType>("/why-us");

const useAddWhyUs = () =>
	useMutation({
		mutationFn: (data: WhyUsSchemaType) => apiClient.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["why-us"],
			});
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddWhyUs;
