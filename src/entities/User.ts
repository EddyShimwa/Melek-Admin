export interface ILoginData {
	password: string;
	message: string;
	data: {
		accessToken: string;
		name: string;
		email: string;
	};
}

export interface IUser {
	email: string;
	password: string;
}

export default interface ILoginCredentials {
	email: string;
	password: string;
}
