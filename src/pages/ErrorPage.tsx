import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<div>
			{isRouteErrorResponse(error)
				? "That page doesn’t exist."
				: "Unexpected error occured!"}
		</div>
	);
};

export default ErrorPage;
