import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const TableRow = ({ children }: Props) => {
	return (
		<tr className="border-b hover:bg-gray-100 last:border-none">{children}</tr>
	);
};

export default TableRow;
