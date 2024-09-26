import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Form/component/loginForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [{ index: true, element: <HomePage /> }],
	},
  {
    path: "/login",
    element: <LoginForm/>,
  }
]);

export default router;
