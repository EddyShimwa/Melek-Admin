import { useMutation } from "@tanstack/react-query";
import { IMilestone } from "../../entities/Milestone";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useDeleteMilestone = (id?: string) => {
	const apiClient = new APIClient<IMilestone>(`/milestones/${id}`);
	return useMutation({
		mutationFn: apiClient.delete,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["milestones"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});
};

export default useDeleteMilestone;
