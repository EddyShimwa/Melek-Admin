import { useMutation } from "@tanstack/react-query";
import { ILoginData } from "../entities/User";
import ILoginResponse from "../entities/User";
import ILoginCredentials from "../entities/User";
import APIClient from "../services/api-client";
import { LoginSchemaType } from "../validations/Login";
import { toastError, toastSuccess } from "../utils/toastHandler";


const apiClient = new APIClient<ILoginData,ILoginCredentials>("/users/login");


const useAuth = () =>
    useMutation({
        mutationFn: (credentials: ILoginResponse) => apiClient.post(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.accessToken);
            toastSuccess(data.message);
        },
        onError: (error) => {
            toastError(error.message);
        },

    });

export default useAuth;  