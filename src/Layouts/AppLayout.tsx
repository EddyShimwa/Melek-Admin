import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav, { NavItem } from "../components/common/NavItems";
import { SidebarData } from "../data/sideBarData";
import ProtectedRoute from "../utils/ProtectedRoutes";

const AppLayout: React.FC = () => {
	return (
		<ProtectedRoute>
			<div className="flex w-full cursor-default">
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
				<div className="flex-1 h-max">
					<Outlet />
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default AppLayout;
