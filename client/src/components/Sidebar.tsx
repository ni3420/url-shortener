import {
  Home,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const SideBar = () => {
  return (
    <aside className="w-64 min-h-screen bg-base-100 border-r border-base-300">
      <div className="p-6 border-b border-base-300">
        <h1 className="text-2xl font-bold">
          My Admin
        </h1>
      </div>

      <ul className="menu p-4 gap-2">
        <li>
          <a className="active">
            <Home size={18} />
            Dashboard
          </a>
        </li>

        <li>
          <a>
            <Users size={18} />
            Users
          </a>
        </li>

        <li>
          <a>
            <BarChart3 size={18} />
            Analytics
          </a>
        </li>

        <li>
          <a>
            <Settings size={18} />
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;