import React, { useState, useEffect } from "react";
import useValues from "../../hooks/values/useValue";
import useOffers from "../../hooks/offers/useOffers";
import useMilestones from "../../hooks/milestones/useMilestones";
import DashBoardCard from "../../components/DashBoardCard";

type StatCard = {
	title: string;
	value: number;
	description: string;
	path: string;
};

const Dashboard: React.FC = () => {
	const [greeting, setGreeting] = useState("");
	const [currentTime, setCurrentTime] = useState(
		new Date().toLocaleTimeString(),
	);
	const { data: valuesData } = useValues({
		pageNumber: 0,
		take: 0,
		search: "",
	});
	const { data: offersData } = useOffers({
		pageNumber: 0,
		take: 0,
		search: "",
	});
	const { data: milestonesData } = useMilestones({
		pageNumber: 0,
		take: 0,
		search: "",
	});
	useEffect(() => {
		const updateGreeting = () => {
			const hour = new Date().getHours();
			if (hour < 12) {
				setGreeting("Good Morning");
			} else if (hour < 18) {
				setGreeting("Good Afternoon");
			} else {
				setGreeting("Good Evening");
			}
		};

		const updateTime = () => {
			setCurrentTime(new Date().toLocaleTimeString());
		};

		updateGreeting();
		const intervalId = setInterval(() => {
			updateTime();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const statCards: StatCard[] = [
		{
			title: "Core Values",
			value: valuesData?.data?.values.length || 0,
			description: "What We Stand For",
			path: "/dashboard/values",
		},
		{
			title: "Excluive Offers ",
			value: offersData?.data?.offers.length || 0,
			description: "Our Offers",
			path: "/dashboard/offers",
		},
		{
			title: "Our Achievements",
			value: milestonesData?.data?.milestones.length || 0,
			description: "Our Milestones",
			path: "/dashboard/milestones",
		},
		{
			title: "All Clients",
			value: 5,
			description: "Total Clients",
			path: "/dashboard ",
		},
		{
			title: "Pending Bookings",
			value: 5,
			description: "Bookings",
			path: "/dashboard/bookings",
		},
	];

	return (
		<>
			<div className="dashboard-container p-5 flex flex-col ">
				<div className="flex flex-col md:flex-row justify-between items-center p-5 h-40 md:h-60">
					<div>
						<h1 className="text-4xl font-bold text-black">
							{greeting}, {"\uD83D\uDC4B"}
						</h1>
					</div>

					<div className="text-xl font-semibold text-gray-600">
						{currentTime}
					</div>
				</div>

				<div className="text-3xl text-green-800 font-extrabold text-black p-5 w-full">
					<h1 className="text-2xl font-bold mb-5 text-black mt-8">
						Dashboard Overview
					</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4  ">
					{statCards.map((stat, index) => (
						<DashBoardCard
							key={index}
							title={stat.title}
							value={stat.value}
							description={stat.description}
							path={stat.path}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
