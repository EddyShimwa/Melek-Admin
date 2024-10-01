import { useMutation } from "@tanstack/react-query";
import { ILoginData } from "../entities/User";
import ILoginResponse from "../entities/User";
import ILoginCredentials from "../entities/User";
import APIClient from "../services/api-client";
import { toastError, toastSuccess } from "../utils/toastHandler";

const apiClient = new APIClient<ILoginData, ILoginCredentials>("/users/login");

const useAuth = () =>
	useMutation({
		mutationFn: (credentials: ILoginResponse) => apiClient.post(credentials),
		onSuccess: (data) => {
			localStorage.setItem("access_token", data.data.accessToken);
			localStorage.setItem("userData", JSON.stringify({ ...data.data }));
			toastSuccess(data.message);
			return data;
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAuth;
