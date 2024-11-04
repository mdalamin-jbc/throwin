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
    "setting",
    "member_list",
    "myPage",
  ].some((path) => location.pathname.includes(path));

  return (
    <div>
      {shouldRenderNavMenu && <NavMenu />}
      <Outlet />
    </div>
  );
};

export default Root;
