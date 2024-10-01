interface ModalProps {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

function LogoutModal({ show, onClose, onConfirm }: ModalProps) {
	if (!show) return null;

	return (
		<div className="fixed top-0 left-0 w-screen h-screen overflow-scroll flex items-center justify-center bg-black/50 z-[1000]">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
				<p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
export default LogoutModal;
