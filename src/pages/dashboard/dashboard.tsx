import React, { useState, useEffect } from "react";
import useValues from "../../hooks/values/useValue";
import useOffers from "../../hooks/offers/useOffers";
import useMilestones from "../../hooks/milestones/useMilestones";
import { Link } from "react-router-dom";

type StatCard = {
	title: string;
	value: string | number;
	description: string;
	path: string;
};

type UserCard = {
	name: string;
	email: string;
	role: string;
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
			title: "Current Bookings",
			value: 5,
			description: "Bookings",
			path: "/dashboard  ",
		},
	];

	const userCard: UserCard = {
		name: "John Doe",
		email: "john.doe@example.com",
		role: "Administrator",
	};

	return (
		<>
			<div className="dashboard-container p-5">
				<div className="flex justify-between items-center p-5 h-80">
					<div>
						<h1 className="text-5xl font-bold text-black">
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

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">
					{statCards.map((stat, index) => (
						<div
							key={index}
							className="bg-white p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-100 flex flex-col justify-between h-60 w-72"
						>
							<Link to={stat.path} className="block h-full w-full text-center">
								<h2 className="text-lg font-bold mb-4 h-10 overflow-hidden">
									{stat.title}
								</h2>
								<p className="text-sm text-gray-600 h-8">{stat.description}</p>
								<p className="text-5xl font-bold text-gray-800 mb-4 h-12">
									{stat.value}
								</p>
							</Link>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
					<div className="bg-blue-100 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
						<h2 className="text-xl font-bold mb-2">Recent Bookings</h2>
						<p className="text-lg font-bold text-gray-800">{userCard.name}</p>
						<p className="text-gray-600">Email: {userCard.email}</p>
						<p className="text-gray-600">Role: {userCard.role}</p>
					</div>

					<div className="bg-green-100 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
						<h2 className="text-xl font-bold mb-2">Recent Activities</h2>
						<ul className="list-disc pl-5">
							<li className="text-gray-600">Signed in from IP: 192.168.1.1</li>
							<li className="text-gray-600">Updated account details</li>
							<li className="text-gray-600">Purchased a subscription</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
