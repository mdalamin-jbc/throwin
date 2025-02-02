import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/images/socialLogin/logo2.png";
import management from "../../assets/icons/management.png";
import ep_seeting from "../../assets/icons/ep_setting.png";
import streamline from "../../assets/icons/streamline_bill-1.png";
import message from "../../assets/icons/message.png";
import qr from "../../assets/icons/qr.png";
import history from "../../assets/icons/historyn.png";
import gacha from "../../assets/icons/gachan.png";
import payment from "../../assets/icons/payment_management.png";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);

  const allMenuItems = [
    {
      label: "ご利用状況・請求",
      icon: <img src={streamline} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/sales_management",
      roles: ["restaurant_owner", "sales_agent", "fc_admin", "glow_admin"],
    },
    {
      label: "アカウント",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/account",
      roles: ["sales_agent"],
    },
    {
      label: "アカウント",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/m_account",
      roles: ["restaurant_owner"],
    },
    {
      label: "クライアント",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/client",
      roles: ["fc_admin", "glow_admin"],
    },
    {
      label: "コメント",
      icon: <img src={message} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/comments",
      roles: ["restaurant_owner"],
    },
    {
      label: "QR作成",
      icon: <img src={qr} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/qr_creation",
      roles: ["restaurant_owner"],
    },
    {
      label: "履歴",
      icon: <img src={history} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/deHistorys",
      roles: ["restaurant_owner"],
    },
    {
      label: "ガチャ",
      icon: <img src={gacha} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/deGacha",
      roles: ["restaurant_owner"],
    },
    {
      label: "支払い管理",
      icon: <img src={payment} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/payment_management",
      roles: ["glow_admin", "fc_admin"],
    },
    {
      label: "設定",
      icon: <img src={ep_seeting} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/settings",
      roles: ["restaurant_owner", "glow_admin", "fc_admin", "sales_agent"],
    },
  ];

  // Filter menu items based on role
  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));

  // Default to the first item's path if no path matches
  useEffect(() => {
    if (!menuItems.some((item) => item.path === location.pathname)) {
      navigate(menuItems[0].path);
    }
  }, [location.pathname, menuItems, navigate]);

  return (
    <div className="w-full h-full min-h-[720px] flex flex-col lg:w-[300px]">
      {/* Logo Section */}
      <div className="shadow-lg flex flex-col justify-between bg-white h-full lg:h-[100vh]">
        <div className="mt-6 ml-9 border-gray-300 text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[50%] lg:w-[221px] mb-[30px] lg:mb-[61px]"
          />
        </div>

        <h4 className="text-sm font-semibold pl-6 mb-6">
          チーム名（企業名）が入ります
        </h4>

        {/* Menu Items */}
        <ul className="flex-1 list-none p-0 m-0 bg-white">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`flex items-center px-6 py-2 lg:px-10 lg:py-4 border-t border-b hover:bg-[#edf9fc] cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-[#edf9fc] font-semibold"
                    : ""
                }`}
              >
                <span className="text-blue-500">{item.icon}</span>
                <span className="text-[#434343] text-base">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <Link
          to={"/dashboard/adminLogin"}
          className="text-center py-3 cursor-pointer bg-[#49BBDF] hover:bg-[#3aa0bf]"
        >
          {/* <FaSignOutAlt className="text-blue-500 text-xl mr-4" /> */}
          <span className="text-white text-lg font-semibold">ログアウト</span>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
