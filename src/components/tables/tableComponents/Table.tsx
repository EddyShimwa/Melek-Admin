import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: React.HTMLAttributes<HTMLElement>["className"];
}

const Table = ({ children, className }: Props) => {
	return (
		<table className={`text-sm text-left text-gray-500 ${className}`}>
			{children}
		</table>
	);
};

export default Table;
