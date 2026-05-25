import { Home, Users, BarChart3, Settings, User } from "lucide-react";

const SideBar = () => {
  return (
    <aside className="w-64 min-h-[180vh] bg-base-100 border-r border-base-300 flex flex-col">
      <div className="p-6 border-b border-base-300">
        <h1 className="text-2xl font-bold">My Admin</h1>
      </div>

      <ul className="menu p-4 gap-2 flex-1">
        <li>
          <a className="active flex items-center gap-2">
            <Home size={18} />
            Dashboard
          </a>
        </li>

        <li>
          <a className="flex items-center gap-2">
            <User size={18} />
            Authentication
          </a>
        </li>

        <li>
          <a className="flex items-center gap-2">
            <Users size={18} />
            Users
          </a>
        </li>

        <li>
          <a className="flex items-center gap-2">
            <BarChart3 size={18} />
            Analytics
          </a>
        </li>

        <li>
          <a className="flex items-center gap-2">
            <Settings size={18} />
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;