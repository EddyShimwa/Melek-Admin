import { FC, ReactNode } from "react";

interface Props {
	type?: "submit" | "reset" | "button";
	text: string;
	icon: ReactNode;
	disabled: boolean;
}

const FormButton: FC<Props> = ({ type, text, icon, disabled }) => (
	<button
		type={type}
		disabled={disabled}
		className="text-white inline-flex items-center bg-blue-700 disabled:bg-blue-700/60 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
	>
		{icon && <span className="mr-1 -ml-1">{icon}</span>}
		{text}
	</button>
);

export default FormButton;
