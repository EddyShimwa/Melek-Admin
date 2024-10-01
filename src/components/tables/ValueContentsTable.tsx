import { FC } from "react";
import { FaWindowClose } from "react-icons/fa";
import Table from "./tableComponents/Table";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell"; // Add missing import statement
import TableRow from "./tableComponents/TableRow";

interface Props {
	valueTitle: string;
	valueDescription: string;
	setValueId: (value: string | null) => void;
}

const ValueContentsTable: FC<Props> = ({
	valueTitle,
	valueDescription,
	setValueId,
}) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen overflow-scroll flex items-center justify-center bg-black/50 z-[1000]">
			<div className="absolute w-full h-full">
				<div className="relative w-full h-full">
					<div
						onClick={() => setValueId(null)}
						className="p-2 absolute top-10 right-10 bg-white cursor-pointer hover:bg-gray-300 rounded-lg"
					>
						<FaWindowClose size={24} color="red" />
					</div>
				</div>
			</div>
			<div className="bg-white p-10 w-3/5 rounded-lg z-20 overflow-x-auto">
				<h2 className="text-2xl font-semibold text-black pb-5">
					{valueTitle} Details
				</h2>
				<Table className="bg-white rounded-lg shadow-md">
					<TableHead>
						<TableHeadCell title="Title" />
						<TableHeadCell title="Description" />
					</TableHead>
					<tbody>
						<TableRow>
							<TableDataCell>{valueTitle}</TableDataCell>
							<TableDataCell className="max-w-lg line-clamp-8">
								{valueDescription}
							</TableDataCell>
						</TableRow>
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default ValueContentsTable;
