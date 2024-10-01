// import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
// import { toastError, toastSuccess } from "../utils/toastHandler";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<void, void>("/users/logout");

const useLogout = () =>
	useQuery({
		queryKey: ["logout"],
		queryFn: apiClient.fetch,
		staleTime: ms("5 min"),
	});

export default useLogout;
