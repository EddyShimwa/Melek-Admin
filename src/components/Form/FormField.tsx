import { FC, ReactNode } from "react";

interface Props {
	label: string;
	htmlFor: string;
	children: ReactNode;
}

const FormField: FC<Props> = ({ label, htmlFor, children }) => (
	<div>
		<label
			htmlFor={htmlFor}
			className="block mb-2 text-sm font-medium text-gray-900"
		>
			{label}
		</label>
		{children}
	</div>
);

export default FormField;
