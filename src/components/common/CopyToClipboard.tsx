import { FC, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copy from "../SVGs/Copy";
import Tick from "../SVGs/Tick";

interface Props {
	text: string;
}

const CopyElement: FC<Props> = ({ text }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => {
				setCopied(false);
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [copied]);

	return (
		<CopyToClipboard text={text} onCopy={() => setCopied(true)}>
			<button className="p-1 bg-app-green rounded-md text-white relative group flex items-center justify-center">
				{copied ? <Tick /> : <Copy />}
				<span className="absolute hidden bottom-full text-xs mb-4 group-hover:block bg-app-green/70 py-1 px-2 rounded-md">
					{copied ? "Copied" : "Copy"}
				</span>
			</button>
		</CopyToClipboard>
	);
};

export default CopyElement;
