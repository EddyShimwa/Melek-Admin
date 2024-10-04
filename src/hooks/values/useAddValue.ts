import { useMutation } from "@tanstack/react-query";
import { IValue } from "../../entities/Value";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError } from "../../utils/toastHandler";
import { ValueSchemaType } from "../../validations/values";

const apiClient = new APIClient<IValue, ValueSchemaType>("/values");

const useAddValue = () =>
	useMutation({
		mutationFn: (data: ValueSchemaType) => apiClient.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["Values"],
			});
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddValue;
