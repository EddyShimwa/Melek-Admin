import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IMilestone } from "../../entities/Milestone";
import { PaginationParams } from "../../entities/PaginateParams";
import useDeleteMilestone from "../../hooks/milestones/useDeleteMilestone";
import useMilestones from "../../hooks/milestones/useMilestones";
import DeleteModal from "../common/DeleteModal";
import Dialog from "../common/Dialog";
import FormModal from "../common/FormModal";
import NoDataFound from "../common/NoDataFound";
import MilestoneForm from "../Form/TableForms/MilestoneForm";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TablePagination from "./tableComponents/TablePagination";
import TableRow from "./tableComponents/TableRow";

const defaultQuery = {
	pageNumber: 1,
	take: 8,
	search: null,
};

const MilestonesTable = () => {
	const [isDelete, setIsDelete] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const deleteMilestone = useDeleteMilestone(deleteId as string);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [querries, setQuerries] = useState<PaginationParams>(defaultQuery);
	const { data, error, isLoading } = useMilestones(querries);
	const [milestoneId, setMilestoneId] = useState<string | null>(null);
	const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | null>(
		null,
	);

	if (error) throw new Error(error.message);

	const handleDelete = () => {
		deleteMilestone.mutate(undefined, {
			onSuccess: () => {
				setIsDelete(false);
			},
		});
	};

	return (
		<main>
			{/* Create and update milestone */}
			<Dialog
				isOpen={isDialogOpen}
				toggleIsOpen={() => setIsDialogOpen((curr) => !curr)}
				className="bg-black/70"
			>
				<FormModal
					title={`${selectedMilestone ? "Update" : "Create new"} milestone`}
				>
					<MilestoneForm
						milestone={selectedMilestone as IMilestone}
						toggleModal={() => setIsDialogOpen((curr) => !curr)}
					/>
				</FormModal>
			</Dialog>

			{/* delete modal */}
			<Dialog
				isOpen={isDelete}
				toggleIsOpen={() => setIsDelete((curr) => !curr)}
				className="bg-black/70"
			>
				<DeleteModal
					toggleModal={() => setIsDelete((curr) => !curr)}
					handleDelete={handleDelete}
				/>
			</Dialog>
			<TableContainer className="min-h-screen">
				<div className="p-5">
					<h2 className="text-2xl font-semibold">Milestones</h2>
				</div>
				<div className="w-full p-5 flex items-center justify-end">
					<button
						type="button"
						onClick={() => {
							setSelectedMilestone(null);
							setIsDialogOpen((curr) => !curr);
						}}
						className="h-9 px-4 rounded-md flex items-center justify-center gap-4 text-white text-sm bg-gray-700 hover:bg-gray-600"
					>
						<FaPlus />
						<span>Add Milestone</span>
					</button>
				</div>
				<Table className="w-full">
					<TableHead>
						<TableHeadCell title="Year" />
						<TableHeadCell title="Description" />
						<TableHeadCell title="Action" className="w-20" />
					</TableHead>
					<tbody>
						{isLoading || !data
							? Array.from({ length: 8 }, (_, i) => (
									<TableRow key={i}>
										{Array.from({ length: 3 }, (_, i) => (
											<TableDataCell key={i} className="h-14">
												<div className="w-full h-[80%] rounded-md bg-gray-200 animate-pulse"></div>
											</TableDataCell>
										))}
									</TableRow>
								))
							: data?.data?.milestones.map((milestone) => (
									<TableRow key={milestone.id}>
										<TableDataCell>{milestone.year}</TableDataCell>
										<TableDataCell>
											{milestone.description.length > 100
												? milestone.description.substring(0, 100) + "..."
												: milestone.description}
										</TableDataCell>
										<TableDataCell className="w-20 flex items-center justify-center">
											<div
												onClick={() =>
													setMilestoneId((curr) =>
														curr === milestone.id ? null : milestone.id,
													)
												}
												className={`p-2 relative cursor-pointer hover:bg-gray-300 rounded-lg ${milestoneId === milestone.id && "bg-gray-300"}`}
											>
												<HiDotsVertical size={20} />
												{milestoneId === milestone.id && (
													<div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-full top-0 mr-6">
														<ul className="py-2 text-sm text-gray-700">
															<li
																onClick={() => {
																	setSelectedMilestone(milestone);
																	setIsDialogOpen((curr) => !curr);
																}}
																className="block px-4 py-2 hover:bg-gray-100"
															>
																Edit
															</li>
															<li
																onClick={() => {
																	setDeleteId(milestone.id);
																	setIsDelete(true);
																}}
																className="block px-4 py-2 hover:bg-gray-100"
															>
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
				{data?.data?.milestones.length === 0 && (
					<NoDataFound
						title="No Milestones Found!"
						description="Try adding some by tapping on Add milestone"
					/>
				)}
				{(data?.data?.milestones as IMilestone[])?.length > 0 && (
					<TablePagination
						loading={isLoading}
						currentPage={querries.pageNumber}
						dataLength={(data && data.data.total) as number}
						handleItemsPerPageChange={(take) =>
							setQuerries((prev) => ({ ...prev, take }))
						}
						handlePageChange={(pageNumber) =>
							setQuerries((prev) => ({ ...prev, pageNumber }))
						}
						itemsPerPage={querries.take}
					/>
				)}
			</TableContainer>
		</main>
	);
};

export default MilestonesTable;
