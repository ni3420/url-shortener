import { Outlet } from "react-router-dom";
import NavBar from "@/features/dashboard/components/NavBar";
import SideBar from "@/features/dashboard/components/sidebar";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open h-screen bg-base-200">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-h-screen overflow-hidden">
        <NavBar />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-base-200/60">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <SideBar />
    </div>
  );
};

export default DashBoardLayout;