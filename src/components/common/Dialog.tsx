import { FC, ReactNode } from "react";
import { FaWindowClose } from "react-icons/fa";

interface Props {
	isOpen: boolean;
	toggleIsOpen: () => void;
	children: ReactNode;
	className?: React.HTMLAttributes<HTMLElement>["className"];
}

const Dialog: FC<Props> = ({ isOpen, children, toggleIsOpen, className }) => {
	return (
		isOpen && (
			<main
				className={`fixed inset-0 w-screen min-h-screen ${className} z-[2000]`}
			>
				<div className="relative w-full h-full  flex items-center justify-center">
					<div
						onClick={() => {
							toggleIsOpen();
						}}
						className="p-2 absolute top-10 right-10 bg-white cursor-pointer hover:bg-gray-300 rounded-lg"
					>
						<FaWindowClose size={24} color="red" />
					</div>
					{children}
				</div>
			</main>
		)
	);
};

export default Dialog;
