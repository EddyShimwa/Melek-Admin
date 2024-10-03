import { FC, useState } from "react";
import { FaPlus, FaWindowClose } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { OfferContent } from "../../entities/Offer";
import Dialog from "../common/Dialog";
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
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedOfferContentId, setSelectedOfferContentId] = useState<
		string | null
	>(null);
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
				<div className="w-full p-5 flex items-center justify-end">
					<button
						type="button"
						onClick={() => setIsDialogOpen((curr) => !curr)}
						className="h-9 px-4 rounded-md flex items-center justify-center gap-4 text-white text-sm bg-gray-700 hover:bg-gray-600"
					>
						<FaPlus />
						<span>Add content</span>
					</button>
				</div>
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
								<Dialog
									isOpen={isDialogOpen}
									toggleIsOpen={() => setIsDialogOpen((curr) => !curr)}
								>
									<div className="text-4xl text-white font-bold">
										Create/update offer content
									</div>
								</Dialog>
								<TableDataCell>{offerContent.title}</TableDataCell>
								<TableDataCell>
									{offerContent.content.length > 100
										? `${offerContent.content.substring(0, 100)}...`
										: offerContent.content}
								</TableDataCell>
								<TableDataCell className="w-20 flex items-center justify-center">
									<div
										onClick={() =>
											setSelectedOfferContentId((curr) =>
												curr === offerContent.id ? null : offerContent.id,
											)
										}
										className="p-2 hover:bg-gray-300 rounded-lg"
									>
										<HiDotsVertical size={20} />
										{selectedOfferContentId === offerContent.id && (
											<div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-full top-0 mr-6">
												<ul className="py-2 text-sm text-gray-700">
													<li className="block px-4 py-2 hover:bg-gray-100">
														Edit
													</li>
													<li className="block px-4 py-2 hover:bg-gray-100">
														Delete
													</li>
												</ul>
											</div>
										)}
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
