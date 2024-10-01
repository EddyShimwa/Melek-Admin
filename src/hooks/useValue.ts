import { useQuery } from "@tanstack/react-query";
import IValue from "../entities/Value";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<IValue[]>("/values");

const useValues = () =>
	useQuery({
		queryKey: ["Values"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useValues;
