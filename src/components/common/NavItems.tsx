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
// import useAuth from "../../hooks/useAuth";
import LogoutModal from "../modals/logoutModal";

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
	const [showModal, setShowModal] = useState(false);
	const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("userData");
		window.location.href = "/";
	};

	return (
		<>
			<LogoutModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleLogout}
			/>
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
					<div className="border-t flex items-center p-3">
						<div
							className={`flex ${expanded ? "justify-between gap-3" : "justify-center"} items-center overflow-hidden transition-all w-max ml-3`}
						>
							{expanded && (
								<div className="leading-4">
									<h4 className="font-semibold">{userData.name}</h4>
									<h6 className="text-xs text-gray-600">{userData.email}</h6>
								</div>
							)}
							<div className="p-2 hover:bg-green-200 rounded-lg">
								<MoreVertical
									size={20}
									className="cursor-pointer"
									onClick={() => setShowModal(true)}
								/>
							</div>
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
		<IconContext.Provider value={{ size: "1.3em" }}>
			<li>
				<NavLink
					to={path}
					end
					className={({ isActive }) =>
						`relative text-sm flex items-center justify-center py-2 px-3 my-5 
                        font-medium rounded-md cursor-pointer 
                        transition-colors group
                        ${
													isActive
														? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
														: "hover:bg-indigo-50 text-gray-600"
												}`
					}
				>
					<Icon />
					<span
						className={`overflow-hidden transition-all ${
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
