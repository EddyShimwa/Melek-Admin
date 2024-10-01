import { useState } from "react";
import useWhyUs from "../../hooks/useWhyUs";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TableRow from "./tableComponents/TableRow";
import { HiDotsVertical } from "react-icons/hi";
import TablePagination from "./tableComponents/TablePagination";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { PaginationParams } from "../../entities/PaginateParams";

const defaultQuery = {
	pageNumber: 1,
	take: 8,
	search: null,
};

const WhyUsTable = () => {
	const [querries, setQuerries] = useState<PaginationParams>(defaultQuery);
	const { data, error, isLoading } = useWhyUs(querries);
	const [whyIs, setWhyIs] = useState<string | null>(null);

	if (error) throw new Error(error.message);

	return (
		<main>
			<TableContainer className="min-h-screen">
				<div className="p-5">
					<h2 className="text-2xl font-semibold">Why Us</h2>
				</div>
				<div className="w-full p-5 flex items-center justify-between">
					<div className="flex items-center w-max justify-center h-9 rounded-md overflow-hidden">
						<div className="h-full flex items-center border pl-3 bg-gray-100 rounded-l-md">
							<IoIosSearch size={20} />
							<input
								type="text"
								placeholder="Search By title..."
								onChange={(event) =>
									setQuerries(() => ({
										...defaultQuery,
										search: event.target.value,
									}))
								}
								className="w-72 pl-3 h-full text-sm outline-none bg-transparent"
							/>
						</div>
					</div>
					<Link to={""}>
						<button
							type="button"
							className="h-9 px-4 rounded-md flex items-center justify-center gap-4 text-white text-sm bg-gray-700 hover:bg-gray-600"
						>
							<FaPlus />
							<span>Add Why Us</span>
						</button>
					</Link>
				</div>
				<Table className="w-full">
					<TableHead>
						<TableHeadCell title="Title" />
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
							: data?.data?.whyUs.map((whyus) => (
									<TableRow key={whyus.id}>
										<TableDataCell>{whyus.title}</TableDataCell>
										<TableDataCell>
											{whyus.description.length > 100
												? whyus.description.substring(0, 100) + "..."
												: whyus.description}
										</TableDataCell>
										<TableDataCell className="w-20 flex items-center justify-center">
											<div
												onClick={() =>
													setWhyIs((curr) =>
														curr === whyus.id ? null : whyus.id,
													)
												}
												className={`p-2 relative cursor-pointer hover:bg-gray-300 rounded-lg ${whyIs === whyus.id && "bg-gray-300"}`}
											>
												<HiDotsVertical size={20} />
												{whyIs === whyus.id && (
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
			</TableContainer>
		</main>
	);
};

export default WhyUsTable;
