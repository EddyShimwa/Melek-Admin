import React, { useState, useEffect, useRef } from "react";
import useValues from "../../hooks/values/useValue";
import useOffers from "../../hooks/offers/useOffers";
import useMilestones from "../../hooks/milestones/useMilestones";
import DashBoardCard from "../../components/DashBoardCard";
import useCompanyProfile from "../../hooks/companyProfile/useCompanyProfile";
import useBookings from "../../hooks/bookings/useBookings";

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
	const { data: bookings } = useBookings({
		pageNumber: 0,
		take: 0,
		search: "",
	});

	const { data } = useCompanyProfile();
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			const handleVideoEnd = () => {
				video.currentTime = 0;
				video.play();
			};

			video.addEventListener("ended", handleVideoEnd);

			return () => {
				video.removeEventListener("ended", handleVideoEnd);
			};
		}
	}, [data]);

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
			title: "Bookings",
			value: bookings?.data.bookings.length || 0,
			description: "Bookings",
			path: "/dashboard/bookings",
		},
	];

	return (
		<>
			<div className="dashboard-container p-5 flex flex-col ">
				<div className="relative h-40 md:h-[40vh]">
					{data && (
						<div className="absolute w-full h-full inset-0 z-10">
							<video
								ref={videoRef}
								src={data.data.video_url}
								muted
								autoPlay
								className="object-cover w-full h-full"
							/>
						</div>
					)}
					<div className="absolute w-full h-full bg-black/30 z-10" />
					<div className="absolute flex flex-col lg:flex-row justify-between items-center w-full h-full p-5 md:p-10 z-20">
						<div>
							<h1 className="text-xl sm:text-4xl font-bold text-white">
								{greeting}, {"\uD83D\uDC4B"}
							</h1>
						</div>

						<div className="text-xl sm:text-2xl font-semibold text-white">
							{currentTime}
						</div>
					</div>
				</div>

				<div className="text-3xl flex text-center font-extrabold text-black p-5 w-full">
					<h1 className="text-2xl font-bold mb-5 text-black mt-8">
						Dashboard Overview
					</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
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
