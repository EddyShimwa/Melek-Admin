import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import useMilestones from "../../hooks/useMilestones";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TablePagination from "./tableComponents/TablePagination";
import TableRow from "./tableComponents/TableRow";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const MilestonesTable = () => {
	const [milestoneId, setMilestoneId] = useState<string | null>(null);
	const { data, error, isLoading } = useMilestones();

	if (error) throw new Error(error.message);

	return (
		<main>
			<TableContainer className="min-h-screen">
				<div className="p-5">
					<h2 className="text-2xl font-semibold">Milestones</h2>
				</div>
				<div className="w-full p-5 flex items-center justify-between">
					<div className="flex items-center w-max justify-center h-9 rounded-md overflow-hidden">
						<div className="h-full flex items-center border pl-3 bg-gray-100 rounded-l-md">
							<IoIosSearch size={20} />
							<div className="px-2">
								<select
									defaultValue={""}
									className="w-56 pl-3 h-full text-sm outline-none bg-transparent"
								>
									<option value="" disabled>
										Search Year
									</option>
									{Array.from({ length: 91 }, (_, i) => 2010 + i).map(
										(year) => (
											<option key={year} value={year}>
												{year}
											</option>
										),
									)}
								</select>
							</div>
						</div>
						<button className="h-full px-5 text-white text-sm bg-gray-700 hover:bg-gray-600">
							Search
						</button>
					</div>

					<Link to={""}>
						<button
							type="button"
							className="h-9 px-4 rounded-md flex items-center justify-center gap-4 text-white text-sm bg-gray-700 hover:bg-gray-600"
						>
							<FaPlus />
							<span>Add Milestone</span>
						</button>
					</Link>
				</div>
				<Table className="w-full">
					<TableHead>
						<TableHeadCell title="Year" />
						<TableHeadCell title="Description" />
						<TableHeadCell title="Action" />
					</TableHead>
					<tbody>
						{isLoading || !data
							? Array.from({ length: 10 }, (_, i) => (
									<TableRow key={i}>
										{Array.from({ length: 3 }, (_, i) => (
											<TableDataCell key={i} className="h-14">
												<div className="w-full h-[80%] rounded-md bg-gray-200 animate-pulse"></div>
											</TableDataCell>
										))}
									</TableRow>
								))
							: data.data.map((milestone) => (
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
				<TablePagination
					loading={isLoading}
					currentPage={1}
					dataLength={(data && data.data.length) as number}
					handleItemsPerPageChange={(num) => console.log(num)}
					handlePageChange={(page) => console.log(page)}
					itemsPerPage={2}
				/>
			</TableContainer>
		</main>
	);
};

export default MilestonesTable;
