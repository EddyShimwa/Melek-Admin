import { useMutation } from "@tanstack/react-query";
import { IAddMilestone } from "../../entities/Milestone";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { MilestoneData } from "./useAddMilestone";

const useUpdateMilestone = (id?: string) => {
	const apiClient = new APIClient<IAddMilestone, MilestoneData>(
		`/milestones/${id}`,
	);
	return useMutation({
		mutationFn: (data: MilestoneData) => apiClient.update(data),
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

export default useUpdateMilestone;
