import { Outlet, useLocation } from "react-router-dom";
import NavBar from "@/features/dashboard/components/NavBar";
import SideBar from "@/features/dashboard/components/sidebar";
import { Toaster } from "sonner";
import { HiOutlineArrowLeft } from "react-icons/hi2";

const DashBoardLayout = () => {
  const location = useLocation();

  const isRootDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-100 text-base-content antialiased">
      <SideBar />

      <div className="flex flex-1 flex-col min-w-0 h-full relative">
        <NavBar />

        <main className="flex-1 overflow-y-auto bg-base-200/40 px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 relative">
            
            {!isRootDashboard && (
              <div className="self-start mb-2 hidden md:block">
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-ghost btn-sm gap-2 pl-1 h-9 min-h-0 text-base-content/60 hover:text-base-content hover:bg-base-200 dark:hover:bg-zinc-800 rounded-xl font-medium text-xs normal-case transition-all border border-base-300/40 shadow-sm bg-base-100/50 backdrop-blur"
                >
                  <HiOutlineArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            )}

            <Outlet />
          </div>
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default DashBoardLayout;