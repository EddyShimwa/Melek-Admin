import { useMutation } from "@tanstack/react-query";
import { IValue } from "../../entities/Value";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { ValueSchemaType } from "../../validations/values";

const useUpdateValue = (id?: string) => {
	const apiClient = new APIClient<IValue, ValueSchemaType>(`/values/${id}`);
	return useMutation({
		mutationFn: (data: ValueSchemaType) => apiClient.update(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["Values"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});
};

export default useUpdateValue;
