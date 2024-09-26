import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputProps {
    name: string;
    type?: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegister<any>;
    [key: string]: any;
    label?: string
  }

export type LoginData = {
    email: string;
    password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}
