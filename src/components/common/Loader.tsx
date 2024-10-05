import { BarLoader, RingLoader } from "react-spinners";

const Loader = () => {
	return (
		<div className="w-full h-full bg-white flex flex-col gap-5 items-center justify-center">
			<RingLoader color="#05732F" />
			<BarLoader color="#05732F" />
			<div className="text-xs animate-pulse">Loading...</div>
		</div>
	);
};

export default Loader;
