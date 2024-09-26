import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./components/Form/component/loginForm";
import Dashboard from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [{ index: true, element: <Dashboard /> }],
	},
  {
    path: "/login",
    element: <LoginForm/>,
  }

]);

export default router;
