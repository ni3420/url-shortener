import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HiOutlineChartBar, 
  HiOutlineLink, 
  // HiOutlineCog6Tooth, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineArrowLeftOnRectangle
} from "react-icons/hi2";
import { useLogout } from "@/features/auth/api/use-logout";

interface SideBarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const SideBar = ({ isMobileOpen, setIsMobileOpen }: SideBarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { mutate } = useLogout();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location, setIsMobileOpen]);

  const navigation = [
    { name: "Dashboard", href: "/home", icon: HiOutlineChartBar },
    { name: "Links", href: "/links", icon: HiOutlineLink },
    // { name: "QR Codes", href: "/qrcodes", icon: HiOutlineQrCode },
    { name: "Campaigns", href: "/campaigns", icon: HiOutlineChartBar },
    // { name: "Settings", href: "/settings", icon: HiOutlineCog6Tooth },
  ];

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 md:sticky z-40 bg-base-200 border-r border-base-300 flex flex-col justify-between transition-all duration-300 ease-in-out h-screen ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } ${
          isMobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className={`flex items-center h-16 px-4 border-b border-base-300 justify-between ${isCollapsed ? "md:justify-center" : ""}`}>
            <div className={`flex items-center gap-2.5 font-bold tracking-tight ${isCollapsed ? "md:hidden" : "flex"}`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
                <span className="text-lg font-black text-white tracking-tighter">S</span>
              </div>
              <span className="text-lg bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                Shortly
              </span>
            </div>

            {isCollapsed && (
              <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
                <span className="text-lg font-black text-white tracking-tighter">S</span>
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex absolute -right-3 top-5 btn btn-circle btn-xs border border-base-300 bg-base-100 text-base-content hover:bg-base-200 shadow-sm z-20"
            >
              {isCollapsed ? <HiOutlineChevronRight className="h-3 w-3" /> : <HiOutlineChevronLeft className="h-3 w-3" />}
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 h-11 rounded-xl font-medium text-sm transition-all relative group ${
                    isActive
                      ? "bg-primary text-primary-content font-semibold shadow-md shadow-primary/10"
                      : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                  } ${isCollapsed ? "md:justify-center" : ""}`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-current" : "text-base-content/60 group-hover:text-base-content"}`} />
                  
                  <span className={`${isCollapsed ? "md:hidden" : "block"}`}>{item.name}</span>

                  {isCollapsed && (
                    <div className="hidden md:block absolute left-full ml-4 px-2.5 py-1.5 bg-neutral text-neutral-content text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl border border-neutral-focus">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-base-300">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl font-medium text-sm text-error hover:bg-error/10 transition-all relative group ${
              isCollapsed ? "md:justify-center" : ""
            }`}
          >
            <HiOutlineArrowLeftOnRectangle className="h-5 w-5 shrink-0" />
            
            <span className={`${isCollapsed ? "md:hidden" : "block"}`}>Logout</span>

            {isCollapsed && (
              <div className="hidden md:block absolute left-full ml-4 px-2.5 py-1.5 bg-error text-error-content text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;