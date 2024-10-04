import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { PaginationParams } from "../../entities/PaginateParams";
import IWhyUsResponse from "../../entities/WhyUs";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<IWhyUsResponse>("/why-us");

const useWhyUs = (querry: PaginationParams) =>
	useQuery({
		queryKey: ["why-us", querry],
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

export default useWhyUs;
