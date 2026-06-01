import { NavLink } from "react-router-dom";
import {QrCode,BarChartBigIcon,Settings,HomeIcon, Link} from "lucide-react"

const SideBar = () => {
  const menuItems = [
    { to: "/home", label: "Home", icon:<HomeIcon/> },
    { to: "/links", label: "links", icon:<Link/> },
    { to: "/dashboard/users", label: "QR Code", icon: <QrCode/> },
    { to: "/dashboard/products", label: "analytics", icon:<BarChartBigIcon/>},
    { to: "/dashboard/settings", label: "Settings", icon: <Settings/> },
  ];

  return (
    <div className="drawer-side z-40 h-full">
      <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      
      <div className="w-72 h-full bg-base-100 text-base-content flex flex-col border-r border-base-200">
        <div className="px-6 py-5 flex items-center gap-2 font-black text-xl tracking-tight bg-base-100">
          <div className="p-2 bg-primary text-primary-content rounded-xl shadow-md shadow-primary/20">
            ⚡
          </div>
          <span>ShortUrl</span>
        </div>

        <ul className="menu menu-md px-4 py-6 flex-1 gap-1.5 font-medium overflow-y-auto">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "active bg-primary text-primary-content font-semibold shadow-lg shadow-primary/20" 
                      : "hover:bg-base-200"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="p-4 mx-4 mb-4 bg-base-200/50 rounded-2xl flex items-center justify-between text-xs font-medium opacity-60 mt-auto">
          <span>© 2026 My App</span>
          <div className="badge badge-sm badge-ghost font-bold">v1.0</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;