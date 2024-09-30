import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav, { NavItem } from "../components/common/NavItems";
import { SidebarData } from "../data/sideBarData";

const AppLayout: React.FC = () => {
	return (
		<>
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
		</>
	);
};

export default AppLayout;
