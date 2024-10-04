import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: React.HTMLAttributes<HTMLElement>["className"];
}

const TableContainer = ({ children, className }: Props) => {
	return (
		<div className={`w-full h-screen bg-white p-5 ${className}`}>
			<div className="h-full w-full min-w-[700px] overflow-x-auto shadow-md rounded-lg">
				<div className="w-full h-full shadow-inner rounded-lg relative">
					{children}
				</div>
			</div>
		</div>
	);
};

export default TableContainer;
