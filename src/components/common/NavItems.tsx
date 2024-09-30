import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

interface SidebarContextType {
	expanded?: boolean;
}

interface Props {
	children: ReactNode;
}

interface SidebarItem {
	title: string;
	path: string;
	Icon: React.ComponentType;
}

const sidebarContext = createContext<SidebarContextType>({});

export default function DashboardNav({ children }: Props) {
	const [expanded, setExpanded] = useState(true);

	const handleResize = () => {
		const width = window.innerWidth;
		if (width >= 768) {
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	};

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<aside className="sticky top-0 left-0 bg-white h-screen w-max z-50">
				<nav className="h-full flex flex-col border-r shadow-md">
					<div className="p-4 pb-3 flex justify-between items-center">
						<div
							className={`overflow-hidden transition-all text-3xl font-extrabold uppercase text-green-800 pl-3 ${
								expanded ? "w-52" : "w-0"
							}`}
						>
							Melek Healthcare
						</div>
						<button
							onClick={() => setExpanded((prev) => !prev)}
							className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100"
						>
							{expanded ? <ChevronFirst /> : <ChevronLast />}
						</button>
					</div>
					<sidebarContext.Provider value={{ expanded }}>
						<ul className="flex-1 p-3">{children}</ul>
					</sidebarContext.Provider>
					{!expanded && (
						<div className="w-full flex items-center justify-center mb-3">
							<div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 cursor-pointer">
								<MoreVertical size={20} />
							</div>
						</div>
					)}
					<div className="border-t flex items-center p-3">
						<div
							className={`flex justify-between items-center overflow-hidden transition-all ${
								expanded ? "w-52 ml-3" : "w-0"
							}`}
						>
							<div className="leading-4">
								<h4 className="font-semibold">Snave Cyusa</h4>
								<span className="text-xs text-gray-600">
									cyusasnaveee@gmail.com
								</span>
							</div>
							{expanded && (
								<MoreVertical size={20} className="cursor-pointer" />
							)}
						</div>
					</div>
				</nav>
			</aside>
		</>
	);
}

export function NavItem({ Icon, path, title }: SidebarItem) {
	const { expanded } = useContext(sidebarContext);

	return (
		<IconContext.Provider value={{ size: "1.5em" }}>
			<li>
				<NavLink
					to={path}
					end
					className={({
						isActive,
					}) => `relative text-sm flex items-center py-2 px-3 my-5 
                    font-medium rounded-md cursor-pointer 
                    transition-colors group
                    ${
											isActive
												? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
												: "hover:bg-indigo-50 text-gray-600"
										}
                  `}
				>
					<Icon />
					<span
						className={`overflow-hidden transition all ${
							expanded ? "w-52 ml-3" : "w-0"
						}`}
					>
						{title}
					</span>

					{!expanded && (
						<div
							className={`absolute left-full rounded-md px-2 py-1 ml-6 z-50 w-max
                        bg-green-100 text-green-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
						>
							{title}
						</div>
					)}
				</NavLink>
			</li>
		</IconContext.Provider>
	);
}
