import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav, { NavItem } from "../components/common/NavItems";
import { SidebarData } from "../data/sideBarData";
import ProtectedRoute from "../utils/ProtectedRoutes";
import Footer from "../components/common/Footer";

const AppLayout: React.FC = () => {
	return (
		<ProtectedRoute>
			<div className="flex w-full min-h-screen">
				<DashboardNav>
					{SidebarData.map((item, idx) => (
						<NavItem
							key={idx}
							Icon={item.icon}
							title={item.title}
							path={item.path}
						/>
					))}
				</DashboardNav>

				<div className="flex flex-col flex-1 min-h-screen">
					<div className="flex-grow">
						<Outlet />
					</div>

					<Footer />
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default AppLayout;
