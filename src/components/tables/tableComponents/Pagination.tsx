import { FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
	totalItems,
	itemsPerPage,
	onPageChange,
	currentPage,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page: number) => {
		onPageChange(page);
	};

	const renderPages = () => {
		if (totalPages <= 3) {
			return Array.from({ length: totalPages }, (_, index) => (
				<div
					key={index + 1}
					className={`p-2 border-r cursor-pointer ${currentPage === index + 1 ? "font-bold" : ""}`}
					onClick={() => handlePageClick(index + 1)}
				>
					{index + 1}
				</div>
			));
		} else {
			return (
				<>
					<div
						className={`p-2 border-r cursor-pointer ${currentPage === 1 ? "font-bold" : ""}`}
						onClick={() => handlePageClick(1)}
					>
						1
					</div>
					{currentPage > 2 && <div className="p-2 border-r">...</div>}
					{currentPage > 1 && currentPage < totalPages && (
						<div
							className={`p-2 border-r cursor-pointer font-bold`}
							onClick={() => handlePageClick(currentPage)}
						>
							{currentPage}
						</div>
					)}
					{currentPage < totalPages - 1 && (
						<div className="p-2 border-r">...</div>
					)}
					<div
						className={`p-2 border-r cursor-pointer ${currentPage === totalPages ? "font-bold" : ""}`}
						onClick={() => handlePageClick(totalPages)}
					>
						{totalPages}
					</div>
				</>
			);
		}
	};

	return (
		<div className="border rounded-md flex items-center text-gray-500 justify-center w-max">
			<button
				className="p-2 border-r"
				onClick={handlePrevPage}
				disabled={currentPage === 1}
			>
				<IoIosArrowBack />
			</button>
			{renderPages()}
			<button
				className="p-2"
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
			>
				<IoIosArrowForward />
			</button>
		</div>
	);
};

export default Pagination;
