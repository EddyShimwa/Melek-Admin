import { useState } from "react";
import { navItems } from "../../data/navItems";
import { logo } from "../../utils/images";
import useCompanyProfile from "../../hooks/useCompanyProfile";
import { scrollTo } from "../../utils/scrollTo";

const NavBar = () => {
	const { data, error } = useCompanyProfile();

	if (error) throw new Error(error.message);

	const [isActive, setIsActive] = useState(false);

	return (
		<section className="fixed w-screen inset-0 flex h-24 z-50">
			<div className="w-2/3 md:w-1/3 lg:w-1/4 h-full bg-app-green relative flex justify-center">
				<div className="text-white text-xs flex md:hidden lg:hidden flex-col gap-1 p-2 pl-5 w-full justify-start">
					<p>
						<strong>Tel:</strong> {data?.data.phone_number}
					</p>
					<p>
						<strong>Email:</strong> {data?.data.email}
					</p>
				</div>
				<div className="absolute top-2/3 md:top-1/2 w-4/5 md:w-2/3">
					<img src={logo} alt="melek healthcare logo" />
				</div>
			</div>
			<div className="flex-1 h-full hidden md:block">
				<div className="h-1/2 flex items-center justify-end px-5 gap-20 text-gray-200 text-xs">
					<p>
						<strong>Tel:</strong> {data?.data.phone_number}
					</p>
					<p>
						<strong>Email:</strong> {data?.data.email}
					</p>
				</div>
				<div className="h-1/2 bg-app-green">
					<ul className="flex justify-around items-center h-full">
						{navItems.map(({ id, title }) => (
							<li
								key={id}
								onClick={() => scrollTo(id)}
								className="uppercase font-medium text-white hover:text-white/80 transition-colors cursor-pointer"
							>
								{title}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex-1 h-full block md:hidden">
				<div className="h-1/2"></div>
				<div className="h-1/2 bg-app-green flex items-center justify-end px-5 relative">
					<div
						onClick={() => setIsActive((curr) => !curr)}
						className="bg-white p-2 rounded-full text-app-green flex items-center justify-center absolute bottom-1/2 shadow-inner"
					>
						{!isActive ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2em"
								height="2em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M22 18.005c0 .55-.446.995-.995.995h-8.01a.995.995 0 0 1 0-1.99h8.01c.55 0 .995.445.995.995M22 12c0 .55-.446.995-.995.995H2.995a.995.995 0 1 1 0-1.99h18.01c.55 0 .995.446.995.995m-.995-5.01a.995.995 0 0 0 0-1.99H8.995a.995.995 0 1 0 0 1.99z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2em"
								height="2em"
								viewBox="0 0 24 24"
							>
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<circle cx="12" cy="12" r="10" opacity="0.5" />
									<path stroke-linecap="round" d="m14.5 9.5l-5 5m0-5l5 5" />
								</g>
							</svg>
						)}
					</div>
					{isActive && (
						<div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-full mt-6 right-10">
							<ul
								className="py-2 text-sm text-gray-700"
								aria-labelledby="dropdownDefaultButton"
							>
								{navItems.map(({ id, title }) => (
									<li key={id} className="block px-4 py-2 hover:bg-gray-100">
										{title}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default NavBar;
