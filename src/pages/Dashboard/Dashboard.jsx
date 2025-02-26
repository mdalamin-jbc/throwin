/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";

const Dashboard = ({ userRole }) => {
  const location = useLocation();
  const shouldShowSideMenu = location.pathname !== "/dashboard/adminLogin";

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {shouldShowSideMenu && <SideMenu userRole={userRole} />}

      <div className={`flex-1 overflow-auto min-h-screen ${shouldShowSideMenu ? 'ml-[300px]' : ''}`}>
        <div className="p-[50px] pr-[54px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;