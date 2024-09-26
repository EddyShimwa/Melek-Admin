import { FC } from "react";

interface Props {
	title: string;
	color?: string;
}

const Heading: FC<Props> = ({ title, color = "#063211" }) => {
	return (
		<div className="max-w-[80%] w-max">
			<h1 className="text-4xl md:text-5xl font-bold" style={{ color }}>
				{title}
			</h1>
			<div className="p-1 w-1/2" style={{ background: color }} />
		</div>
	);
};

export default Heading;
