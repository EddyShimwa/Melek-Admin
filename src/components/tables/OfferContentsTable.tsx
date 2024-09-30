import { FC } from "react";
import { FaWindowClose } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { OfferContent } from "../../entities/Offer";
import Table from "./tableComponents/Table";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TableRow from "./tableComponents/TableRow";

interface Props {
	relation: string;
	offerContents: OfferContent[];
	setOfferContentId: (value: string | null) => void;
}

const OfferContentsTable: FC<Props> = ({
	relation,
	offerContents,
	setOfferContentId,
}) => {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen overflow-scroll flex items-center justify-center bg-black/50 z-[1000]">
			<div className="absolute w-full h-full">
				<div className="relative w-full h-full">
					<div
						onClick={() => setOfferContentId(null)}
						className="p-2 absolute top-10 right-10 bg-white cursor-pointer hover:bg-gray-300 rounded-lg"
					>
						<FaWindowClose size={24} color="red" />
					</div>
				</div>
			</div>
			<div className=" bg-white p-10 w-11/12 rounded-lg z-20 overflow-x-auto">
				<h2 className="text-2xl font-semibold text-black pb-5">
					{relation} contents
				</h2>
				<Table className="bg-white w-full rounded-lg shadow-md">
					<TableHead>
						{/* <TableHeadCell title="Related Offer" /> */}
						<TableHeadCell title="Content Title" />
						<TableHeadCell title="Content Description" />
						<TableHeadCell title="Actions" />
					</TableHead>
					<tbody>
						{offerContents?.map((offerContent) => (
							<TableRow key={offerContent.id}>
								{/* <TableDataCell>{relation}</TableDataCell> */}
								<TableDataCell>{offerContent.title}</TableDataCell>
								<TableDataCell>
									{offerContent.content.length > 100
										? `${offerContent.content.substring(0, 100)}...`
										: offerContent.content}
								</TableDataCell>
								<TableDataCell className="w-20 flex items-center justify-center">
									<div className="p-2 hover:bg-gray-300 rounded-lg">
										<HiDotsVertical size={20} />
									</div>
								</TableDataCell>
							</TableRow>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default OfferContentsTable;