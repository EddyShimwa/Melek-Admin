interface Props {
	title: string;
	className?: React.HTMLAttributes<HTMLElement>["className"];
}

const TableHeadCell = ({ title, className }: Props) => {
	return (
		<th scope="col" className={`px-4 py-3 ${className}`}>
			{title}
		</th>
	);
};

export default TableHeadCell;
