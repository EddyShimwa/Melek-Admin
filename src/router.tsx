import { createBrowserRouter } from "react-router-dom";
import OffersTables from "./components/tables/OffersTables";
import AppLayout from "./Layouts/AppLayout";
import CompanyProfile from "./pages/dashboard/company-profile";
import Dashboard from "./pages/dashboard/dashboard";
import ValuesTable from "./components/tables/ValuesTable";
import WhyUs from "./pages/dashboard/why-us";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./pages/loginForm";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: "offers", element: <OffersTables /> },
			{ path: "why-us", element: <WhyUs /> },
			{ path: "values", element: <ValuesTable /> },
			{ path: "company-profile", element: <CompanyProfile /> },
		],
	},
	{
		path: "/",
		element: <LoginForm />,
	},
]);

export default router;
