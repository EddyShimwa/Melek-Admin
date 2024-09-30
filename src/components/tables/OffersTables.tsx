import { Fragment, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import useOffers from "../../hooks/useOffers";
import OfferContentsTable from "./OfferContentsTable";
import Table from "./tableComponents/Table";
import TableContainer from "./tableComponents/TableContainer";
import TableDataCell from "./tableComponents/TableDataCell";
import TableHead from "./tableComponents/TableHead";
import TableHeadCell from "./tableComponents/TableHeadCell";
import TablePagination from "./tableComponents/TablePagination";
import TableRow from "./tableComponents/TableRow";

const OffersTables = () => {
	const { data, error, isLoading } = useOffers();
	const [offerId, setOfferId] = useState<string | null>(null);
	const [openOfferContentId, setOpenOfferContentId] = useState<string | null>(
		null,
	);

	if (error) throw new Error(error.message);

	return (
		<main>
			<TableContainer className="min-h-screen">
				<div className="p-5">
					<h2 className="text-2xl font-semibold">Company Offers</h2>
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
										{Array.from({ length: 2 }, (_, i) => (
											<TableDataCell key={i} className="h-14">
												<div className="w-full h-[80%] rounded-md bg-gray-200 animate-pulse"></div>
											</TableDataCell>
										))}
									</TableRow>
								))
							: data.data.map((offer) => (
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
													className={`p-2 relative cursor-pointer hover:bg-gray-300 rounded-lg ${offerId === offer.id && "bg-gray-300"}`}
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
										{openOfferContentId === offer.id && (
											<OfferContentsTable
												relation={offer.title}
												offerContents={offer.contents}
												setOfferContentId={setOpenOfferContentId}
											/>
										)}
									</Fragment>
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

export default OffersTables;
