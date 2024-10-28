import NavMenu from "../Shared/NavMenu/NavMenu";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  return (
    <div>
      {/* Only render NavMenu on the "gacha" route */}
      {location.pathname.includes("gacha") && <NavMenu />}
      <Outlet />
    </div>
  );
};

export default Root;
