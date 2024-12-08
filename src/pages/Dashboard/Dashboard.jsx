import { Outlet } from "react-router-dom"; // To render the dynamic content
import SideMenu from "./SideMenu";

const Dashboard = () => {
  return (
    <div className="flex h-screen"> {/* Use flex to create a side-by-side layout */}
      <SideMenu />
      
      <div className="flex-1 p-6"> {/* This will be the content area */}
        <Outlet /> {/* Render the matched route's component here */}
      </div>
    </div>
  );
};

export default Dashboard;
