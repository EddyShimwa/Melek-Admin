export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    password: string;
}

export default interface ILoginResponse {
    user: IUser;
    token: string;
}