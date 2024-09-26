import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

const AppLayout = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
			<div>Footer</div>
		</div>
	);
};

export default AppLayout;
