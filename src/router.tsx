import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./pages/loginForm";
import Dashboard from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [{ index: true, element: <Dashboard /> }],
	},
  {	
    path: "/",
    element: <LoginForm/>,
  }

]);

export default router;
