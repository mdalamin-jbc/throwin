/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SideMenu from "./SideMenu";

const Dashboard = ({ userRole }) => {
  const location = useLocation();
  const shouldShowSideMenu = location.pathname !== "/dashboard/adminLogin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      {/* Hamburger Menu Button - Only visible on mobile */}
      {shouldShowSideMenu && (
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-[#49BBDF] text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      )}

      {/* Overlay for mobile menu */}
      {shouldShowSideMenu && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      {shouldShowSideMenu && (
        <SideMenu 
          userRole={userRole} 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 min-h-screen ${shouldShowSideMenu ? 'lg:ml-[300px]' : ''}`}>
        <div className="p-4 lg:p-[50px] lg:pr-[54px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;