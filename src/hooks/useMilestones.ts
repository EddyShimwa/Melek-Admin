import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import IMilestoneResponse from "../entities/Milestone";
import { PaginationParams } from "../entities/PaginateParams";
import APIClient from "../services/api-client";

const apiClient = new APIClient<IMilestoneResponse>("/milestones");

const useMilestones = (querry: PaginationParams) =>
	useQuery({
		queryKey: ["milestones", querry],
		queryFn: () =>
			apiClient.fetch({
				params: {
					pageNumber: querry.pageNumber,
					take: querry.take,
					search: querry.search,
				},
			}),
		staleTime: ms("5 min"),
	});

export default useMilestones;
