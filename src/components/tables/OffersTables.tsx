import { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IOffer } from "../../entities/Offer";
import { PaginationParams } from "../../entities/PaginateParams";
import useDeleteOffer from "../../hooks/offers/useDeleteOffer";
import useOffers from "../../hooks/offers/useOffers";
import DeleteModal from "../common/DeleteModal";
import Dialog from "../common/Dialog";
import FormModal from "../common/FormModal";
import OfferForm from "../Form/TableForms/OfferForm";
import OfferContentsTable from "./OfferContentsTable";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TablePagination from "./tableComponents/TablePagination";
import TableRow from "./tableComponents/TableRow";

const defaultQuery: PaginationParams = {
	pageNumber: 1,
	take: 8,
	search: null,
};

const OffersTables = () => {
	const [isDelete, setIsDelete] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [querries, setQuerries] = useState<PaginationParams>(defaultQuery);
	const { data, error, isLoading } = useOffers(querries);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const deleteOffer = useDeleteOffer(deleteId as string);
	const [offerId, setOfferId] = useState<string | null>(null);
	const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
	const [openOfferContentId, setOpenOfferContentId] = useState<string | null>(
		null,
	);

	if (error) {
		throw new Error(error.message);
	}

	const handleDelete = () => {
		deleteOffer.mutate(undefined, {
			onSuccess: () => {
				setIsDelete(false);
			},
		});
	};

	return (
		<main>
			{/* create and update modal */}
			<Dialog
				isOpen={isDialogOpen}
				toggleIsOpen={() => setIsDialogOpen((curr) => !curr)}
				className="bg-black/70"
			>
				<FormModal title={`${selectedOffer ? "Update" : "Create New"} Offer`}>
					<OfferForm
						offer={selectedOffer as IOffer}
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
					<h2 className="text-2xl font-semibold">Company Offers</h2>
				</div>

				<div className="w-full p-5 flex items-center justify-between">
					<div className="flex items-center w-max justify-center h-9 rounded-md overflow-hidden">
						<div className="h-full flex items-center border pl-3 bg-gray-100 rounded-l-md">
							<IoIosSearch size={20} />
							<input
								type="text"
								placeholder="Search By title..."
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

					<button
						type="button"
						onClick={() => {
							setIsDialogOpen((curr) => !curr);
							setSelectedOffer(null);
						}}
						className="h-9 px-4 rounded-md flex items-center justify-center gap-4 text-white text-sm bg-gray-700 hover:bg-gray-600"
					>
						<FaPlus />
						<span>Add Offer</span>
					</button>
				</div>

				<Table className="w-full">
					<TableHead>
						<TableHeadCell title="Title" />
						<TableHeadCell title="Actions" className="w-20" />
					</TableHead>

					<tbody>
						{isLoading || !data
							? Array.from({ length: 10 }, (_, i) => (
									<TableRow key={i}>
										{Array.from({ length: 2 }, (_, j) => (
											<TableDataCell key={j} className="h-14">
												<div className="w-full h-[80%] rounded-md bg-gray-200 animate-pulse"></div>
											</TableDataCell>
										))}
									</TableRow>
								))
							: data.data.offers.length > 0
								? data.data.offers.map((offer) => (
										<Fragment key={offer.id}>
											<TableRow>
												<TableDataCell>{offer.title}</TableDataCell>
												<TableDataCell className="w-20 flex items-center justify-center">
													<div
														onClick={() =>
															setOfferId((curr) =>
																curr === offer.id ? null : offer.id,
															)
														}
														className={`p-2 relative cursor-pointer hover:bg-gray-300 rounded-lg ${offerId === offer.id ? "bg-gray-300" : ""}`}
													>
														<HiDotsVertical size={20} />
														{offerId === offer.id && (
															<div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-full top-0 mr-6">
																<ul className="py-2 text-sm text-gray-700">
																	<li
																		onClick={() =>
																			setOpenOfferContentId(offer.id)
																		}
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		View Contents
																	</li>
																	<li
																		onClick={() => {
																			setSelectedOffer(offer);
																			setIsDialogOpen(true);
																		}}
																		className="block px-4 py-2 hover:bg-gray-100"
																	>
																		Edit
																	</li>
																	<li
																		onClick={() => {
																			setDeleteId(offer.id);
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

											{openOfferContentId === offer.id && (
												<OfferContentsTable
													id={offer.id}
													relation={offer.title}
													offerContents={offer.contents}
													setOfferContentId={setOpenOfferContentId}
												/>
											)}
										</Fragment>
									))
								: null}
					</tbody>
				</Table>

				{data?.data?.offers.length === 0 && (
					<div className="w-full flex items-center justify-center p-5">
						No Offers found!
					</div>
				)}

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

export default OffersTables;
