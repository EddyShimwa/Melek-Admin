import { useState } from "react";
import useCompanyProfile from "../../hooks/useCompanyProfile";
import Heading from "../common/Heading";
import Plus from "../SVGs/Plus";
import Minus from "../SVGs/Minus";
import useWhyUs from "../../hooks/useWhyUs";

const WhyUs = () => {
	const { data: companyProfile } = useCompanyProfile();
	const { data, error, isLoading } = useWhyUs();
	const [activeId, setActiveId] = useState<string | null>(null);

	if (error) throw new Error(error.message);

	if (isLoading) return "loading...";

	return (
		<div className="flex flex-col items-start justify-center w-11/12 mx-auto py-20">
			<Heading title="WHY US?" />
			<div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen lg:h-[60vh] mt-10">
				<div className="hidden lg:block">
					<img
						src={companyProfile?.data.why_us_image_url}
						alt="why us image"
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="py-5 px-10 h-full overflow-y-scroll">
					{data?.data.map((item) => (
						<div key={item.id} className="mt-5">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-medium">{item.title}</h3>
								<div
									onClick={() =>
										setActiveId(activeId === item.id ? null : item.id)
									}
								>
									{activeId === item.id ? <Minus /> : <Plus />}
								</div>
							</div>
							<div className="w-full p-0.5 bg-black rounded-sm my-2" />
							{activeId === item.id && (
								<p className="text-sm py-3">{item.description}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WhyUs;
