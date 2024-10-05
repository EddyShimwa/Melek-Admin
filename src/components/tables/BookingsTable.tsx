import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IBook } from "../../entities/bookings";
import { PaginationParams } from "../../entities/PaginateParams";
import useBookings from "../../hooks/bookings/useBookings";
import useDeleteBookings from "../../hooks/bookings/useDeleteBookings";
import DeleteModal from "../common/DeleteModal";
import Dialog from "../common/Dialog";
import NoDataFound from "../common/NoDataFound";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TablePagination from "./tableComponents/TablePagination";
import TableRow from "./tableComponents/TableRow";
import { Link } from "react-router-dom";

const defaultQuery: PaginationParams = {
	pageNumber: 1,
	take: 8,
	search: null,
};

const BookingsTable = () => {
	const [isDelete, setIsDelete] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const deleleBooking = useDeleteBookings(deleteId as string);
	const [querries, setQuerries] = useState<PaginationParams>(defaultQuery);
	const { data, error, isLoading } = useBookings(querries);
	const [bookingId, setBookingId] = useState<string | null>("");

	if (error) throw new Error(error.message);

	const handleDelete = () => {
		console.log(deleteId);
		deleleBooking.mutate(undefined, {
			onSuccess: () => {
				setIsDelete(false);
			},
		});
	};

	return (
		<main>
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
					<h2 className="text-2xl font-semibold">Bookings</h2>
				</div>

				<div className="w-full p-5 flex items-center justify-between">
					<div className="flex items-center w-max justify-start h-9 rounded-md overflow-hidden">
						<div className="h-full flex items-center border pl-3 bg-gray-100 rounded-l-md">
							<IoIosSearch size={20} />
							<input
								type="text"
								placeholder="Search By name..."
								onChange={(event) => {
									setQuerries(() => ({
										...defaultQuery,
										search: event.target.value,
									}));
								}}
								className="w-72 pl-3 h-full text-sm outline-none bg-transparent"
							/>
						</div>
					</div>
				</div>
				<Table className="w-full">
					<TableHead>
						<TableHeadCell title="Name/Company title" />
						<TableHeadCell title="Email address" />
						<TableHeadCell title="Subject" />
						<TableHeadCell title="Time" />
						<TableHeadCell title="Actions" className="w-20" />
					</TableHead>

					<tbody>
						{isLoading || !data
							? Array.from({ length: 8 }, (_, i) => (
									<TableRow key={i}>
										{Array.from({ length: 5 }, (_, i) => (
											<TableDataCell key={i} className="h-14">
												<div className="w-full h-[80%] rounded-md bg-gray-200 animate-pulse"></div>
											</TableDataCell>
										))}
									</TableRow>
								))
							: data?.data?.bookings.map((booking) => (
									<TableRow key={booking.id}>
										<TableDataCell>{booking.name}</TableDataCell>
										<TableDataCell>{booking.email}</TableDataCell>
										<TableDataCell>
											{booking.subject.toUpperCase()}
										</TableDataCell>
										<TableDataCell>
											{formatDistanceToNow(new Date(booking.createdAt), {
												addSuffix: true,
											})}
										</TableDataCell>
										<TableDataCell className="w-20 flex items-center justify-center">
											<div
												onClick={() =>
													setBookingId((curr) =>
														curr === booking.id ? null : booking.id,
													)
												}
												className={`p-2 relative cursor-pointer hover:bg-gray-300 rounded-lg ${bookingId === booking.id && "bg-gray-300"}`}
											>
												<HiDotsVertical size={20} />
												{bookingId === booking.id && (
													<div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-full top-0 mr-6">
														<ul className="py-2 text-sm text-gray-700">
															<Link to={`${booking.id}`}>
																<li className="block px-4 py-2 hover:bg-gray-100">
																	View
																</li>
															</Link>
															<li
																onClick={() => {
																	setDeleteId(booking.id);
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
				{data?.data?.bookings.length === 0 && (
					<NoDataFound
						title="No Bookings Found!"
						description="No has maked any booking yet!"
					/>
				)}
				{(data?.data?.bookings as IBook[])?.length > 0 && (
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

export default BookingsTable;
