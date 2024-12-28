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
    <div>
      {shouldRenderNavMenu && <NavMenu />}

      <Outlet />
    </div>
  );
};

export default Root;
