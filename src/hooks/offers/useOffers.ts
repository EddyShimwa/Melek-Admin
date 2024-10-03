import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import IOfferResponse from "../../entities/Offer";
import { PaginationParams } from "../../entities/PaginateParams";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<IOfferResponse>("/offers");

const useOffers = (querry: PaginationParams) =>
	useQuery({
		queryKey: ["offers", querry],
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

export default useOffers;
