import { FC } from "react";
import { InputProps } from "../../../@types/props";

interface TextareaProps extends InputProps {
	rows: number;
}

const TextAreaField: FC<TextareaProps> = ({
	placeholder,
	register,
	name,
	error,
	id,
	value,
	rows,
}) => (
	<>
		<textarea
			id={id}
			rows={rows}
			defaultValue={value}
			className={`bg-gray-50 border ${!error?.message ? "border-gray-300 text-gray-900" : "border-red-600 text-red-600"} text-sm rounded-lg block w-full p-2.5`}
			placeholder={placeholder}
			{...register(name)}
		/>
		<p className="text-xs text-red-600 mt-1 min-h-4">
			{error && error.message}
		</p>
	</>
);

export default TextAreaField;
