import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; 
import { IconContext } from "react-icons";
import { SidebarData } from "../../data/sideBarData";
import { toastSuccess } from "../../utils/toastHandler";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {

    localStorage.removeItem("token"); 
    toastSuccess("Logout Successful");
    navigate("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "gray", size: "1.5em" }}>
        <nav className="fixed top-0 left-0 h-screen w-64 bg-gray-200 flex flex-col justify-between">
          <div className="p-8 font-bold text-app-green">
            <h1>MELEK HEALTHCARE</h1>
          </div>

          <ul className="flex flex-col p-6 space-y-12 fixed top-28">
            {SidebarData.map((item, index) => (
              <li key={index} className="text-gray-700 text-lg">
  <NavLink
  to={item.path}
  end
  className={({ isActive }) =>
    isActive ? "flex items-center space-x-2 text-app-green" : "flex items-center space-x-2"
  }
>
  <span>
    <item.icon />
  </span>
  <span>{item.title}</span>
</NavLink>

              </li>
            ))}
          </ul>


          <div className="p-6">
            <button
              onClick={handleLogout} 
              className="flex items-center space-x-2 text-gray-700"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
