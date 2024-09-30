import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import IOffer from "../entities/Offer";
import APIClient from "../services/api-client";

const apiClient = new APIClient<IOffer[]>("/offers");

const useOffers = () =>
	useQuery({
		queryKey: ["offers"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useOffers;
