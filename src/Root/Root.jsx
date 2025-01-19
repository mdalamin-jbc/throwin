import NavMenu from "../Shared/NavMenu/NavMenu";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  // Check if the current path matches any of the specified routes
  const shouldRenderNavMenu = [
    "search",
    "favorite",
    "gacha",
    "notice",

    "member_list",
    "myPage",
    "store",
    "reg_complete",
    "staff",
    "stuff_list",
    "displayName",
    "terms",
    "history",
    "nickName_reg",
  ].some((path) => location.pathname.includes(path));

  // Check if the current path is within the dashboard

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
    {/* Top Navigation Menu */}
    {shouldRenderNavMenu && <NavMenu />}
  
    {/* Main Content */}
    <main className="flex-grow">
      <Outlet />
    </main>
  </div>
  
  );
};

export default Root;
