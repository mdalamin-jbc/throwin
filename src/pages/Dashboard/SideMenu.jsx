import { FaHome, FaUser, FaFileInvoice, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/images/socialLogin/logo2.png";

const SideMenu = () => {
  return (
    <div className="w-[311px] h-screen  shadow-lg flex flex-col justify-between">
      {/* Logo Section */}
      <div className="mt-6 ml-9  border-gray-300 text-center ">
        <img src={logo} alt="" className="w-[221px] mb-[61px]" />
      </div>

      {/* Menu Items */}
      <ul className="flex-1 list-none p-0 m-0">
        <li className="flex items-center px-6 py-4 hover:bg-gray-200 cursor-pointer">
          <FaHome className="text-blue-500 text-xl mr-4" />
          <span className="text-gray-700 text-lg">店舗 (チーム)</span>
        </li>
        <li className="flex items-center px-6 py-4 hover:bg-gray-200 cursor-pointer">
          <FaUser className="text-blue-500 text-xl mr-4" />
          <span className="text-gray-700 text-lg">アカウント設定</span>
        </li>
        <li className="flex items-center px-6 py-4 hover:bg-gray-200 cursor-pointer">
          <FaFileInvoice className="text-blue-500 text-xl mr-4" />
          <span className="text-gray-700 text-lg">ご利用状況・請求</span>
        </li>
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
