import React from "react";
import { IBook } from "../entities/bookings";
import Table from "./tables/tableComponents/Table";
import TableHead from "./tables/tableComponents/TableHead";
import TableHeadCell from "./tables/tableComponents/TableHeadCell";
import TableRow from "./tables/tableComponents/TableRow";
import TableDataCell from "./tables/tableComponents/TableDataCell";
import CopyElement from "./common/CopyToClipboard";
import { formatDistanceToNow } from "date-fns";

interface BookingCardProps {
	booking: IBook;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
	return (
		<div className="md:p-10">
			<div className="p-5">
				<h2 className="text-3xl font-semibold">{booking.subject}</h2>
			</div>
			<Table className="w-full">
				<TableHead>
					<TableHeadCell title="Name" />
					<TableHeadCell title="Email" />
					<TableHeadCell title="Time" />
				</TableHead>

				<tbody>
					<TableRow>
						<TableDataCell>
							<span className="flex items-center justify-between">
								<span>{booking.name}</span>
								<CopyElement text={booking.name} />
							</span>
						</TableDataCell>
						<TableDataCell>
							<span className="flex items-center justify-between">
								<span>{booking.email}</span>
								<CopyElement text={booking.email} />
							</span>
						</TableDataCell>
						<TableDataCell>
							{formatDistanceToNow(new Date(booking.createdAt), {
								addSuffix: true,
							})}
						</TableDataCell>
					</TableRow>
				</tbody>
			</Table>
			<div
				className="prose max-w-none text-sm"
				dangerouslySetInnerHTML={{ __html: booking.message }}
			/>
		</div>
	);
};

export default BookingCard;
