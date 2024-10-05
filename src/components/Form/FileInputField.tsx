import { FC } from "react";
import { FieldError } from "react-hook-form";

interface Props {
	id?: string;
	value?: string;
	error?: FieldError;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInputField: FC<Props> = ({ error, id, value, onChange, name }) => (
	<>
		<input
			type="file"
			id={id}
			name={name}
			onChange={onChange}
			className={`bg-gray-50 border ${!error?.message ? "border-gray-300 text-gray-900" : "border-red-600 text-red-600"} text-sm rounded-lg block w-full p-2.5`}
			value={value}
		/>
		<p className="text-xs text-red-600 mt-1 min-h-4">
			{error && error.message}
		</p>
	</>
);

export default FileInputField;
