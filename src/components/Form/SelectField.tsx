import { FC } from "react";
import { InputProps } from "../../../@types/props";

interface SelectProps extends InputProps {
	options: Array<{ value: string; label: string }>;
}

const SelectField: FC<SelectProps> = ({
	id,
	name,
	value,
	register,
	error,
	options,
}) => (
	<>
		<select
			id={id}
			defaultValue={value}
			{...register(name)}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
		<p className="text-xs text-red-600 mt-1 min-h-4">
			{error && error.message}
		</p>
	</>
);

export default SelectField;
