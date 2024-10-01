import { useQuery } from "@tanstack/react-query";
import IMilestone from "../entities/Milestone";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<IMilestone[]>("/milestones");

const useMilestones = () =>
	useQuery({
		queryKey: ["milestones"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useMilestones;
