import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { toast } from "sonner";
import { 
  HiOutlineLink, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
  HiOutlineXMark
} from "react-icons/hi2";
import { Folder } from "lucide-react";

interface SideBarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function SideBar({ isMobileOpen, setIsMobileOpen }: SideBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location, setIsMobileOpen]);

  const navigation = [
    { name: "Dashboard", href: "/home", icon: HiOutlineSquares2X2 },
    { name: "Links", href: "/links", icon: HiOutlineLink },
    { name: "Campaigns", href: "/campaigns", icon: Folder },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Failed to sign out cleanly");
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 lg:sticky z-40 bg-base-100 dark:bg-zinc-950 border-r border-base-200 dark:border-zinc-900 flex flex-col justify-between transition-all duration-300 ease-in-out h-screen shrink-0 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          isMobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className={`flex items-center h-16 px-5 border-b border-base-200 dark:border-zinc-900 justify-between relative ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
            <div className={`items-center gap-2.5 font-bold tracking-tight ${isCollapsed ? "lg:hidden" : "flex"}`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/10">
                <span className="text-lg font-black text-white tracking-tighter">S</span>
              </div>
              <span className="text-lg bg-gradient-to-r from-base-content to-base-content/70 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                Shortly
              </span>
            </div>

            {isCollapsed && (
              <div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/10">
                <span className="text-lg font-black text-white tracking-tighter">S</span>
              </div>
            )}

            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-base-content/50 hover:bg-base-200 dark:hover:bg-zinc-900"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex absolute -right-3 top-5 h-6 w-6 items-center justify-center rounded-full border border-base-200 dark:border-zinc-800 bg-base-100 dark:bg-zinc-900 text-base-content/40 hover:text-base-content dark:hover:text-zinc-100 hover:shadow-sm transition z-20 cursor-pointer"
            >
              {isCollapsed ? <HiOutlineChevronRight className="h-3 w-3" /> : <HiOutlineChevronLeft className="h-3 w-3" />}
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === "/home" 
                ? location.pathname === item.href 
                : location.pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 h-10 rounded-xl font-medium text-sm transition-all relative group cursor-pointer ${
                    isActive
                      ? "bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-base-content/60 dark:text-zinc-400 hover:bg-base-200 dark:hover:bg-zinc-900/50 hover:text-base-content dark:hover:text-zinc-100"
                  } ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}
                >
                  <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-base-content/40 dark:text-zinc-500 group-hover:text-base-content dark:group-hover:text-zinc-300"}`} />
                  
                  <span className={`transition-opacity duration-150 ${isCollapsed ? "lg:hidden" : "block"}`}>{item.name}</span>

                  {isCollapsed && (
                    <div className="hidden lg:block absolute left-full ml-3 px-2 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-base-200 dark:border-zinc-900">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl font-medium text-sm text-rose-500 dark:text-rose-400 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 transition-all relative group cursor-pointer ${
              isCollapsed ? "lg:justify-center lg:px-0" : ""
            }`}
          >
            <HiOutlineArrowLeftOnRectangle className="h-5 w-5 shrink-0" />
            
            <span className={`${isCollapsed ? "lg:hidden" : "block"}`}>Logout</span>

            {isCollapsed && (
              <div className="hidden lg:block absolute left-full ml-3 px-2 py-1.5 bg-rose-500 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}