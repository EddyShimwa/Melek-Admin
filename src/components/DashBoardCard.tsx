import React from "react";
import { Link } from "react-router-dom";

interface dashboardCardProps {
	title: string;
	description: string;
	value: number;
	path: string;
}

const DashBoardCard = ({
	title,
	description,
	value,
	path,
}: dashboardCardProps) => {
	return (
		<div className="bg-app-green/20 p-12 rounded-lg shadow-lg hover:scale-100 hover:bg-gray-300 flex flex-col justify-between h-60">
			<Link to={path} className="block h-full w-full text-center">
				<h2 className="text-lg font-bold mb-4 h-10">{title}</h2>
				<p className="text-sm text-gray-600 h-8">{description}</p>
				<p className="text-5xl font-bold text-gray-800 mb-4 h-12">{value}</p>
			</Link>
		</div>
	);
};

export default DashBoardCard;
