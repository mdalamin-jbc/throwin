import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/images/socialLogin/logo2.png";
import management from "../../assets/icons/management.png";
import ep_seeting from "../../assets/icons/ep_setting.png";
import streamline from "../../assets/icons/streamline_bill-1.png";
import message from "../../assets/icons/message.png";
import qr from "../../assets/icons/qr.png";
import history from "../../assets/icons/historyn.png";
import gacha from "../../assets/icons/gachan.png";
import payment from "../../assets/icons/payment_management.png";
import UseUserDetails from "../../hooks/UseUserDetails";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const SideMenu = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = UseUserDetails();
  const userRole = localStorage.getItem("userRole");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Helper function to check if a path is active
  const isPathActive = (path, subPaths = []) => {
    if (location.pathname === path) return true;
    return subPaths.some((subPath) =>
      location.pathname.startsWith(path + subPath)
    );
  };

  const allMenuItems = [
    {
      label: "売上管理",
      icon: <img src={streamline} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/sales_management",
      roles: ["restaurant_owner", "sales_agent", "fc_admin", "glow_admin"],
    },
    {
      label: "アカウント",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/account",
      subPaths: ["/creat_new"],
      roles: ["restaurant_owner"],
    },
    {
      label: "クライアント",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/client",
      subPaths: ["/creat_new"],
      roles: ["fc_admin", "glow_admin", "sales_agent"],
    },
    {
      label: "営業代理店",
      icon: <img src={management} alt="" className="mr-4 w-[30px]" />,
      path: "/dashboard/sales_agent",
      subPaths: ["/sales_agent"],
      roles: ["glow_admin", "fc_admin"],
    },

    // common account
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
  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  // Check if current path is valid
  const isValidPath = (currentPath) => {
    // First check if the exact path exists
    const exactPathExists = menuItems.some((item) => item.path === currentPath);
    if (exactPathExists) return true;

    // Then check for subpaths
    return menuItems.some((item) => {
      if (!item.subPaths) return false;
      return item.subPaths.some(
        (subPath) => currentPath === item.path + subPath
      );
    });
  };

  // Handle logout

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      toast.loading("ログアウト中...");

      const refreshToken = localStorage.getItem("refreshToken") || "string";
      const csrfToken =
        document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content") || "";

      const response = await fetch(
        "https://api-dev.throwin-glow.com/auth/logout",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${user.access}`,
            "Content-Type": "application/json",
            "X-CSRFTOKEN": csrfToken,
          },
          body: JSON.stringify({
            refresh: user.refresh,
          }),
        }
      );

      if (response.ok) {
        logout(); // ローカルの認証データをクリア
        toast.dismiss();
        toast.success("正常にログアウトしました");
        // オプション: リダイレクト処理
        // navigate("/admin/login");
      } else {
        throw new Error(
          `ログアウトに失敗しました（ステータス: ${response.status}）`
        );
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
      toast.dismiss();
      toast.error("ログアウトに失敗しました。もう一度お試しください。");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Only redirect to sales_management on initial load or direct dashboard access
  useEffect(() => {
    // Only redirect if we're at the root dashboard path
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/sales_management");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-[300px]">
      <div className="shadow-lg flex flex-col justify-between bg-white h-full">
        <div>
          <div className="mt-6 ml-9 border-gray-300 text-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[50%] lg:w-[221px] mb-[30px] lg:mb-[61px]"
            />
          </div>

          <h4 className="text-sm font-semibold pl-6 mb-6">
            {userDetails?.kind} :{" "}
            <span className="font-bold">{userDetails?.name}</span>
          </h4>

          <ul className="flex-1 list-none p-0 m-0 bg-white">
            {/* change when dynamic */}
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-6 py-2 lg:px-10 lg:py-4 border-t border-b hover:bg-[#edf9fc] cursor-pointer
                    ${
                      isPathActive(item.path, item.subPaths || [])
                        ? "bg-[#edf9fc] font-semibold"
                        : ""
                    }
                  `}
                >
                  <span className="text-blue-500">{item.icon}</span>
                  <span className="text-[#434343] text-base">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-center py-3 cursor-pointer bg-[#49BBDF] hover:bg-[#3aa0bf] mt-auto w-full"
        >
          <span className="text-white text-lg font-semibold">
            {isLoggingOut ? "ログアウト中..." : "ログアウト"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
