import React from "react";
import Pagination from "./Pagination";

interface AsideProps {
	currentPage: number;
	itemsPerPage: number;
	dataLength: number;
	loading: boolean;
	handlePageChange: (page: number) => void;
	handleItemsPerPageChange: (itemsPerPage: number) => void;
}

const TablePagination: React.FC<AsideProps> = ({
	currentPage,
	itemsPerPage,
	dataLength,
	loading,
	handlePageChange,
	handleItemsPerPageChange,
}) => {
	if (loading) {
		return (
			<div className="w-full p-5 flex items-center justify-between">
				{/* Loading skeleton */}
			</div>
		);
	}

	return (
		<div className="w-full p-5 flex items-center justify-between">
			<div className="text-sm text-gray-500">
				Showing{" "}
				<span className="text-black font-medium">
					{(currentPage - 1) * itemsPerPage + 1} -{" "}
					{Math.min(currentPage * itemsPerPage, dataLength)}
				</span>{" "}
				of <span className="text-black font-medium">{dataLength}</span>
				<span className="text-black font-medium mx-4">Items per page:</span>
				<span className="p-2 border-2 rounded-md">
					<select
						className="outline-none w-10 bg-transparent"
						value={itemsPerPage}
						onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
					>
						{Array.from({ length: 8 }, (_, i) => (
							<option key={i} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
				</span>
			</div>
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={dataLength}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default TablePagination;
