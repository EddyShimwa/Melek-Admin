import { createBrowserRouter } from "react-router-dom";
import ValuesTable from "./components/tables/ValuesTable";
import AppLayout from "./Layouts/AppLayout";
import CompanyProfile from "./pages/dashboard/CompanyProfile";
import Dashboard from "./pages/dashboard/dashboard";
import Milestones from "./pages/dashboard/Milestones";
import Offers from "./pages/dashboard/offers";
import WhyUs from "./pages/dashboard/why-us";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./pages/loginForm";
import Bookings from "./pages/dashboard/Bookings";
import BookingSinglePage from "./pages/dashboard/BookingSinglePage";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: "offers", element: <Offers /> },
			{ path: "why-us", element: <WhyUs /> },
			{ path: "milestones", element: <Milestones /> },
			{ path: "values", element: <ValuesTable /> },
			{ path: "company-profile", element: <CompanyProfile /> },
			{ path: "bookings", element: <Bookings /> },
			{ path: "bookings/:id", element: <BookingSinglePage /> },
		],
	},
	{
		path: "/",
		element: <LoginForm />,
	},
]);

export default router;
