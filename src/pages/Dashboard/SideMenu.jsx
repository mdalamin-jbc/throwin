import { FaHome, FaUser, FaFileInvoice, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom"; 
import logo from "../../assets/images/socialLogin/logo2.png";
import search from "../../assets/icons/search.png";

const SideMenu = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: "アカウント",
      icon: <FaHome className="text-xl mr-4" />,
      path: "/dashboard/account", // Make sure this path matches with the route in your router
    },
    {
      label: "設定",
      icon: <FaUser className="text-xl mr-4" />,
      path: "settings", // Same for this
    },
    {
      label: "ご利用状況・請求",
      icon: <FaFileInvoice className="text-xl mr-4" />,
      path: "/dashboard/billing", // Same for this
    },
  ];

  return (
    <div className="w-[311px] h-screen shadow-lg flex flex-col justify-between">
      {/* Logo Section */}
      <div className="mt-6 ml-9 border-gray-300 text-center">
        <img src={logo} alt="Logo" className="w-[221px] mb-[61px]" />
      </div>

      <h4 className="text-sm text-center mb-6">チーム名（企業名）が入ります</h4>

      {/* Menu Items */}
      <ul className="flex-1 list-none p-0 m-0">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={`flex items-center px-6 py-4 hover:bg-gray-200 cursor-pointer ${
                location.pathname === item.path ? "bg-gray-200 font-bold" : ""
              }`}
            >
              <span className="text-blue-500">{item.icon}</span>
              <span className="text-gray-700 text-lg">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="flex items-center px-6 py-4 border-t border-gray-300 hover:bg-gray-200 cursor-pointer">
        <FaSignOutAlt className="text-blue-500 text-xl mr-4" />
        <span className="text-gray-700 text-lg">ログアウト</span>
      </div>
    </div>
  );
};

export default SideMenu;
