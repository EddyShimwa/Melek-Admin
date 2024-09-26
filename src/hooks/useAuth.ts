import { useMutation } from "@tanstack/react-query";
import { ILoginCredentials } from "../entities/User";
import ILoginResponse from "../entities/User";
import APIClient from "../services/api-client";
import { LoginSchemaType } from "../validations/Login";

const apiClient = new APIClient<ILoginCredentials,ILoginResponse>("/users/login");


const useAuth = () =>
    useMutation({
        mutationFn: (credentials: ILoginCredentials) => apiClient.post(credentials),
    });

export default useAuth;  