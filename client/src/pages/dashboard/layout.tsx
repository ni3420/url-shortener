import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/features/dashboard/components/NavBar";
import SideBar from "@/features/dashboard/components/sidebar";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-base-100">
      <SideBar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <NavBar onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;