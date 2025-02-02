/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";

const Dashboard = ({ userRole }) => {
  const location = useLocation();
  const shouldShowSideMenu = location.pathname !== "/dashboard/adminLogin";

  return (
    <div className="flex h-screen bg-[#f8f9fb] overflow-auto">
      {shouldShowSideMenu && <SideMenu userRole={userRole} />}

      <div className="flex-1 mt-[50px] ml-[54px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
