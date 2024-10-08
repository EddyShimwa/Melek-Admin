import { ReactNode } from "react";

interface Props {
	children: ReactNode | string;
	className?: React.HTMLAttributes<HTMLElement>["className"];
	colSpan?: number;
}

const TableDataCell = ({ children, className }: Props) => {
	return (
		<td
			className={`px-4 py-2 font-medium text-gray-900 border-b border-gray-200 whitespace-nowrap ${className}`}
		>
			{children}
		</td>
	);
};

export default TableDataCell;
