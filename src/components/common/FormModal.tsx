import { FC, ReactNode } from "react";

interface Props {
	title: string;
	children: ReactNode;
}

const FormModal: FC<Props> = ({ title, children }) => {
	return (
		<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
				<div className="flex justify-start items-center pb-4 mb-4 rounded-t border-b">
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>
				{children}
			</div>
		</div>
	);
};

export default FormModal;
