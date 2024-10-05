import { useParams } from "react-router-dom";
import useSingleBookings from "../../hooks/bookings/useSingleBooking";
import TableContainer from "../../components/tables/tableComponents/TableContainer";
import BookingCard from "../../components/BookingCard";

const BookingSinglePage = () => {
	const { id } = useParams<{ id: string }>();
	const { data, error, isLoading } = useSingleBookings(id as string);

	if (error) throw new Error(error.message);

	return (
		data?.data &&
		!isLoading && (
			<TableContainer className="min-h-screen">
				<BookingCard booking={data?.data} />
			</TableContainer>
		)
	);
};

export default BookingSinglePage;
