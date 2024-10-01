import { useQuery } from "@tanstack/react-query";
import IWhyUs from "../entities/WhyUs";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<IWhyUs[]>("/why-us");

const useWhyUs = () =>
	useQuery({
		queryKey: ["why-us"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useWhyUs;
