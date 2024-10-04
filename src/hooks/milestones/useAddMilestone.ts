import { useMutation } from "@tanstack/react-query";
import { IAddMilestone } from "../../entities/Milestone";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError } from "../../utils/toastHandler";

export interface MilestoneData {
	year: number;
	description: string;
}

const apiClient = new APIClient<IAddMilestone, MilestoneData>("/milestones");

const useAddMilestone = () =>
	useMutation({
		mutationFn: (data: MilestoneData) => apiClient.post(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["milestones"],
			});
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddMilestone;
