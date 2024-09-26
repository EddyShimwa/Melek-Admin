import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ICompanyProfile from "../entities/CompanyProfile";
import APIClient from "../services/api-client";

const apiClient = new APIClient<ICompanyProfile>("/company-profile");

const useCompanyProfile = () =>
	useQuery({
		queryKey: ["company_profile"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useCompanyProfile;
