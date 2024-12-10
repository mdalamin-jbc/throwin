import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#f8f9fb] overflow-auto">
      <SideMenu />

      <div className="flex-1 mt-[50px] ml-[54px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
