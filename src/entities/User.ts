export interface ILoginData{
    email: string;
    password: string;
    message: string;
   data: {
         accessToken: string;
   }
}

export interface IUser {
    email: string;
    password: string;
}

export default interface ILoginCredentials {
   email: string;
    password: string;
}