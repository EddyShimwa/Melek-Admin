import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import CompanyProfile from "./pages/dashboard/company-profile";
import Dashboard from "./pages/dashboard/dashboard";
import Offers from "./pages/dashboard/offers";
import Values from "./pages/dashboard/values";
import WhyUs from "./pages/dashboard/why-us";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./pages/loginForm";
import Milestones from "./pages/dashboard/Milestones";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: "offers", element: <Offers /> },
			{ path: "why-us", element: <WhyUs /> },
			{ path: "values", element: <Values /> },
			{ path: "milestones", element: <Milestones /> },
			{ path: "company-profile", element: <CompanyProfile /> },
		],
	},
	{
		path: "/",
		element: <LoginForm />,
	},
]);

export default router;
