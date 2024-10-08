import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { PaginationParams } from "../../entities/PaginateParams";
import IValueResponse from "../../entities/Value";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<IValueResponse>("/values");

const useValues = (querry: PaginationParams) =>
	useQuery({
		queryKey: ["Values", querry],
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

export default useValues;
