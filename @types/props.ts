/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputProps {
	name: string;
	type?: string;
	placeholder?: string;
	error?: FieldError;
	register: UseFormRegister<any>;
	id?: string;
	value?: string;
}

export type LoginData = {
	email: string;
	password: string;
};

export interface UserProfile {
	id: string;
	email: string;
	name: string;
}
