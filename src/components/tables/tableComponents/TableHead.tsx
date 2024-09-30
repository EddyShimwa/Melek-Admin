import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const TableHead = ({ children }: Props) => {
	return (
		<thead className="text-xs text-gray-700 uppercase bg-gray-50">
			<tr>{children}</tr>
		</thead>
	);
};

export default TableHead;
