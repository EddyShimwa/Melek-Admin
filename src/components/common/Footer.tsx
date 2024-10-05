import React from "react";

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-100 text-gray-800 py-4 text-center">
			<p className="text-sm">
				&copy; {currentYear} Melek Healthcare. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
